#!/bin/bash

echo "========================================="
echo "🚨 URGENT SECURITY FIX SCRIPT"
echo "========================================="
echo ""

echo "⚠️  BEFORE RUNNING THIS SCRIPT:"
echo "1. STOP YOUR VPS SERVER IMMEDIATELY"
echo "2. REVOKE your old Zoho OAuth credentials at https://api-console.zoho.in/"
echo "3. Generate NEW Zoho OAuth credentials"
echo ""
read -p "Have you completed the above steps? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Please complete the prerequisites first!"
    exit 1
fi

echo ""
echo "Step 1: Updating Next.js to secure version..."
npm install next@15.5.7

echo ""
echo "Step 2: Running security audit..."
npm audit

echo ""
echo "Step 3: Attempting to fix vulnerabilities..."
npm audit fix

echo ""
echo "Step 4: Creating .env.local file..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local from example"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your NEW Zoho credentials!"
    echo "   File location: $(pwd)/.env.local"
else
    echo "ℹ️  .env.local already exists. Please verify it has the correct credentials."
fi

echo ""
echo "Step 5: Reinstalling dependencies..."
npm install

echo ""
echo "========================================="
echo "✅ Security updates applied!"
echo "========================================="
echo ""
echo "📋 NEXT STEPS (CRITICAL):"
echo ""
echo "1. Edit .env.local and add your NEW Zoho credentials:"
echo "   nano .env.local"
echo ""
echo "2. Verify .env.local is NOT committed to git:"
echo "   git status"
echo ""
echo "3. Test the application locally:"
echo "   npm run dev"
echo ""
echo "4. Check for any git history with old credentials:"
echo "   git log --all --full-history -- app/utils/getRefreshToken.js"
echo ""
echo "5. If credentials were committed to git, clean history:"
echo "   - Use BFG Repo-Cleaner or git-filter-repo"
echo "   - Force push to remote"
echo "   - Contact GitHub/GitLab support if public repo"
echo ""
echo "6. Scan your VPS server for backdoors (see SECURITY_ISSUES.md)"
echo ""
echo "7. Only AFTER testing, redeploy to VPS with new environment variables"
echo ""
echo "📖 Read SECURITY_ISSUES.md for complete details"
echo ""
