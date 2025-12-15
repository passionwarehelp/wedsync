#!/bin/bash
# Run this script on your computer to push WedSync to GitHub

echo "🚀 Pushing WedSync to GitHub..."

# Add GitHub remote (if not already added)
git remote remove github 2>/dev/null
git remote add github https://github.com/passionwarehelp/wedsync.git

# Push to GitHub
git push -u github main

echo "✅ Done! Your code is now on GitHub at:"
echo "   https://github.com/passionwarehelp/wedsync"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com and sign up with GitHub"
echo "2. Click 'Add New...' → 'Project'"
echo "3. Import passionwarehelp/wedsync"
echo "4. Click 'Deploy'"
echo "5. Add your domain wedsync.com in Vercel settings"
