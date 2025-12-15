#!/bin/bash
# Push WedSync code to GitHub from your local computer

echo "🚀 Pushing WedSync to GitHub..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the wedsync directory."
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files except ignored ones
echo "📁 Adding files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit: WedSync wedding planning app with web dashboard"

# Add GitHub remote
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/passionwarehelp/wedsync.git

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "✅ Success! Your code is now on GitHub!"
echo "🌐 View it at: https://github.com/passionwarehelp/wedsync"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Sign up with GitHub"
echo "3. Import passionwarehelp/wedsync"
echo "4. Deploy!"
