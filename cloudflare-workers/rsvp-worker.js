/**
 * WedSync RSVP Worker
 *
 * Deploy this worker to Cloudflare and set up a custom domain: rsvp.mywedsync.com
 *
 * This worker serves a beautiful web-based RSVP form that guests can use
 * without downloading the app. RSVPs are stored and can be synced to the app.
 *
 * Setup Instructions:
 * 1. Go to Cloudflare Dashboard > Workers & Pages
 * 2. Create a new Worker named "wedsync-rsvp"
 * 3. Paste this code
 * 4. Go to Settings > Triggers > Custom Domains
 * 5. Add custom domain: rsvp.mywedsync.com
 * 6. Create a KV namespace called "WEDSYNC_RSVP" and bind it to the worker
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Enable CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Handle RSVP submission
    if (request.method === "POST" && path.startsWith("/api/rsvp")) {
      try {
        const data = await request.json();
        const rsvpCode = path.split("/").pop();

        // Store RSVP in KV
        const rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await env.WEDSYNC_RSVP.put(rsvpId, JSON.stringify({
          ...data,
          rsvpCode,
          submittedAt: new Date().toISOString(),
        }));

        // Also add to the wedding's RSVP list
        const existingList = await env.WEDSYNC_RSVP.get(`wedding_${rsvpCode}`) || "[]";
        const rsvpList = JSON.parse(existingList);
        rsvpList.push(rsvpId);
        await env.WEDSYNC_RSVP.put(`wedding_${rsvpCode}`, JSON.stringify(rsvpList));

        return new Response(JSON.stringify({ success: true, id: rsvpId }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Handle fetching RSVPs for a wedding (for app sync)
    if (request.method === "GET" && path.startsWith("/api/rsvps/")) {
      const rsvpCode = path.split("/").pop();
      const rsvpListJson = await env.WEDSYNC_RSVP.get(`wedding_${rsvpCode}`) || "[]";
      const rsvpList = JSON.parse(rsvpListJson);

      const rsvps = [];
      for (const rsvpId of rsvpList) {
        const rsvpData = await env.WEDSYNC_RSVP.get(rsvpId);
        if (rsvpData) {
          rsvps.push(JSON.parse(rsvpData));
        }
      }

      return new Response(JSON.stringify(rsvps), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract RSVP code and couple name from URL
    const rsvpCode = path.slice(1); // Remove leading slash
    const coupleName = url.searchParams.get("couple") || "the Happy Couple";

    if (!rsvpCode) {
      return new Response(getErrorPage(), {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Serve the RSVP page
    return new Response(getRSVPPage(rsvpCode, decodeURIComponent(coupleName)), {
      headers: { "Content-Type": "text/html" },
    });
  },
};

function getErrorPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invalid RSVP Link - WedSync</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1F1F1F 0%, #000000 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 400px;
    }
    .icon { font-size: 64px; margin-bottom: 24px; }
    h1 { color: #EF4444; margin-bottom: 16px; }
    p { color: #9CA3AF; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">❌</div>
    <h1>Invalid RSVP Link</h1>
    <p>This RSVP link is not valid. Please check with the couple for the correct link.</p>
  </div>
</body>
</html>`;
}

function getRSVPPage(rsvpCode, coupleName) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP - ${coupleName}'s Wedding</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1F1F1F 0%, #000000 100%);
      min-height: 100vh;
      color: #fff;
    }
    .header {
      text-align: center;
      padding: 48px 20px 32px;
      background: linear-gradient(135deg, #1F1F1F 0%, #0a0a0a 100%);
    }
    .icon {
      width: 64px;
      height: 64px;
      background: rgba(245, 184, 0, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 28px;
    }
    .subtitle {
      color: #9CA3AF;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    .couple-name {
      color: #F5B800;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      padding: 24px 20px 48px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      color: #D1D5DB;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .required { color: #EF4444; }
    input, textarea, select {
      width: 100%;
      padding: 16px;
      background: #171717;
      border: 1px solid #262626;
      border-radius: 12px;
      color: #fff;
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus, select:focus {
      border-color: #F5B800;
    }
    input::placeholder, textarea::placeholder {
      color: #666;
    }
    textarea {
      min-height: 80px;
      resize: vertical;
    }
    .attendance-buttons {
      display: flex;
      gap: 12px;
    }
    .attendance-btn {
      flex: 1;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid #262626;
      background: #171717;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .attendance-btn:hover {
      border-color: #404040;
    }
    .attendance-btn.accept.selected {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10B981;
    }
    .attendance-btn.decline.selected {
      background: rgba(245, 158, 11, 0.2);
      border-color: #F59E0B;
    }
    .attendance-btn .icon {
      font-size: 32px;
      margin-bottom: 8px;
      background: none;
      width: auto;
      height: auto;
    }
    .attendance-btn .label {
      font-weight: 600;
      color: #9CA3AF;
    }
    .attendance-btn.selected .label {
      color: #fff;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .checkbox {
      width: 24px;
      height: 24px;
      border: 1px solid #525252;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .checkbox.checked {
      background: #F5B800;
      border-color: #F5B800;
    }
    .checkbox-label {
      color: #fff;
      font-size: 16px;
    }
    .meal-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .meal-option {
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid #404040;
      background: #171717;
      color: #9CA3AF;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .meal-option.selected {
      background: rgba(245, 184, 0, 0.2);
      border-color: #F5B800;
      color: #F5B800;
    }
    .submit-btn {
      width: 100%;
      padding: 20px;
      background: #F5B800;
      border: none;
      border-radius: 16px;
      color: #000;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: opacity 0.2s;
      margin-top: 32px;
    }
    .submit-btn:hover {
      opacity: 0.9;
    }
    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .footer-note {
      text-align: center;
      color: #525252;
      font-size: 12px;
      margin-top: 24px;
    }
    .success-page {
      display: none;
      text-align: center;
      padding: 48px 20px;
    }
    .success-page.show {
      display: block;
    }
    .success-icon {
      width: 96px;
      height: 96px;
      background: rgba(16, 185, 129, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 48px;
    }
    .success-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .success-message {
      color: #9CA3AF;
      font-size: 18px;
    }
    .form-page { display: block; }
    .form-page.hidden { display: none; }
    .error-text {
      color: #EF4444;
      font-size: 14px;
      margin-top: 8px;
    }
    .plus-one-section {
      display: none;
      margin-top: 20px;
      padding: 20px;
      background: #0a0a0a;
      border-radius: 16px;
      border: 1px solid #262626;
    }
    .plus-one-section.show { display: block; }
  </style>
</head>
<body>
  <div class="form-page" id="formPage">
    <div class="header">
      <div class="icon">💌</div>
      <div class="subtitle">You are invited to</div>
      <div class="couple-name">${coupleName}</div>
    </div>

    <div class="container">
      <form id="rsvpForm">
        <!-- Attendance -->
        <div class="form-group">
          <label>Will you be attending? <span class="required">*</span></label>
          <div class="attendance-buttons">
            <div class="attendance-btn accept" onclick="selectAttendance(true)">
              <div class="icon">✓</div>
              <div class="label">Joyfully Accept</div>
            </div>
            <div class="attendance-btn decline" onclick="selectAttendance(false)">
              <div class="icon">✕</div>
              <div class="label">Regretfully Decline</div>
            </div>
          </div>
          <div class="error-text" id="attendingError" style="display: none;">Please select your attendance</div>
        </div>

        <!-- Name -->
        <div class="form-group">
          <label>Your Name <span class="required">*</span></label>
          <input type="text" id="name" placeholder="Enter your full name" required>
          <div class="error-text" id="nameError" style="display: none;">Please enter your name</div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="email" placeholder="your@email.com">
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" id="phone" placeholder="(555) 123-4567">
        </div>

        <!-- Attending-only sections -->
        <div id="attendingOnlySections" style="display: none;">
          <!-- Plus One -->
          <div class="form-group">
            <div class="checkbox-group" onclick="togglePlusOne()">
              <div class="checkbox" id="plusOneCheckbox"></div>
              <span class="checkbox-label">I will be bringing a +1</span>
            </div>
          </div>

          <div class="plus-one-section" id="plusOneSection">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Guest Name <span class="required">*</span></label>
              <input type="text" id="plusOneName" placeholder="Enter your guest's name">
              <div class="error-text" id="plusOneNameError" style="display: none;">Please enter your guest's name</div>
            </div>
          </div>

          <!-- Meal Preference -->
          <div class="form-group">
            <label>Meal Preference</label>
            <div class="meal-options">
              <div class="meal-option selected" onclick="selectMeal('standard')">Standard</div>
              <div class="meal-option" onclick="selectMeal('vegetarian')">Vegetarian</div>
              <div class="meal-option" onclick="selectMeal('vegan')">Vegan</div>
              <div class="meal-option" onclick="selectMeal('glutenFree')">Gluten-Free</div>
              <div class="meal-option" onclick="selectMeal('other')">Other</div>
            </div>
          </div>

          <!-- Dietary Restrictions -->
          <div class="form-group">
            <label>Dietary Restrictions or Allergies</label>
            <textarea id="dietaryRestrictions" placeholder="e.g., nut allergy, lactose intolerant"></textarea>
          </div>
        </div>

        <!-- Message -->
        <div class="form-group">
          <label>Message for the Couple (Optional)</label>
          <textarea id="message" placeholder="Send your well wishes..."></textarea>
        </div>

        <button type="submit" class="submit-btn" id="submitBtn">Submit RSVP</button>

        <div class="footer-note">Your response helps the couple plan their special day</div>
      </form>
    </div>
  </div>

  <div class="success-page" id="successPage">
    <div class="success-icon" id="successIcon">✓</div>
    <div class="success-title" id="successTitle">Thank You!</div>
    <div class="success-message" id="successMessage">We can't wait to celebrate with you!</div>
  </div>

  <script>
    const rsvpCode = "${rsvpCode}";
    const coupleName = "${coupleName}";

    let formData = {
      attending: null,
      name: "",
      email: "",
      phone: "",
      plusOne: false,
      plusOneName: "",
      mealType: "standard",
      dietaryRestrictions: "",
      message: ""
    };

    function selectAttendance(attending) {
      formData.attending = attending;
      document.querySelectorAll('.attendance-btn').forEach(btn => btn.classList.remove('selected'));
      document.querySelector(attending ? '.attendance-btn.accept' : '.attendance-btn.decline').classList.add('selected');
      document.getElementById('attendingError').style.display = 'none';

      // Show/hide attending-only sections
      document.getElementById('attendingOnlySections').style.display = attending ? 'block' : 'none';

      if (!attending) {
        formData.plusOne = false;
        document.getElementById('plusOneCheckbox').classList.remove('checked');
        document.getElementById('plusOneSection').classList.remove('show');
      }
    }

    function togglePlusOne() {
      formData.plusOne = !formData.plusOne;
      document.getElementById('plusOneCheckbox').classList.toggle('checked');
      document.getElementById('plusOneSection').classList.toggle('show');
      if (!formData.plusOne) {
        document.getElementById('plusOneNameError').style.display = 'none';
      }
    }

    function selectMeal(meal) {
      formData.mealType = meal;
      document.querySelectorAll('.meal-option').forEach(opt => opt.classList.remove('selected'));
      event.target.classList.add('selected');
    }

    function validateForm() {
      let isValid = true;

      // Check attendance
      if (formData.attending === null) {
        document.getElementById('attendingError').style.display = 'block';
        isValid = false;
      }

      // Check name
      const name = document.getElementById('name').value.trim();
      if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('nameError').style.display = 'none';
      }

      // Check plus one name if plus one is selected
      if (formData.plusOne) {
        const plusOneName = document.getElementById('plusOneName').value.trim();
        if (!plusOneName) {
          document.getElementById('plusOneNameError').style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('plusOneNameError').style.display = 'none';
        }
      }

      return isValid;
    }

    document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      formData.name = document.getElementById('name').value.trim();
      formData.email = document.getElementById('email').value.trim();
      formData.phone = document.getElementById('phone').value.trim();
      formData.plusOneName = document.getElementById('plusOneName').value.trim();
      formData.dietaryRestrictions = document.getElementById('dietaryRestrictions').value.trim();
      formData.message = document.getElementById('message').value.trim();

      try {
        const response = await fetch('/api/rsvp/' + rsvpCode, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Show success page
          document.getElementById('formPage').classList.add('hidden');
          document.getElementById('successPage').classList.add('show');

          if (!formData.attending) {
            document.getElementById('successIcon').textContent = '💔';
            document.getElementById('successIcon').style.background = 'rgba(245, 158, 11, 0.2)';
            document.getElementById('successTitle').textContent = 'Response Received';
            document.getElementById('successMessage').textContent = "We're sorry you can't make it. " + coupleName + " will miss you!";
          }
        } else {
          throw new Error('Failed to submit');
        }
      } catch (error) {
        alert('There was an error submitting your RSVP. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
      }
    });
  </script>
</body>
</html>`;
}
