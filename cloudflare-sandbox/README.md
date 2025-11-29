# WedSync Cloudflare Sandbox

This is a test environment for the QR code guest photo upload feature.

## Quick Deploy to Cloudflare Pages

1. Create a Cloudflare account at https://pages.cloudflare.com
2. Connect your GitHub repository
3. Set the build directory to `cloudflare-sandbox`
4. Deploy!

Or use Cloudflare Pages direct upload:
```bash
npx wrangler pages deploy cloudflare-sandbox --project-name=wedsync-sandbox
```

## How It Works

- Guests scan the QR code from the app
- They're taken to a mobile-optimized web page
- They can upload photos or take new ones
- Photos are shown in a preview grid
- Upload button sends photos to your backend (currently simulated)

## Production Setup

When ready for production:

1. Replace the mock wedding data with an API call to fetch wedding info by QR code
2. Replace the simulated upload with actual API calls to your Cloudflare Worker
3. Store photos in Cloudflare R2 or another cloud storage
4. Update the QR code URL in the app from `wedsync-sandbox.pages.dev` to your production domain

## Testing Locally

Open `index.html` in a browser:
```bash
open cloudflare-sandbox/index.html
```

The page works completely offline for testing purposes.
