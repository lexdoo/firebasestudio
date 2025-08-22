# AWS Amplify Deployment Guide

## Quick Deploy Steps:

1. **Push to GitHub** (if not already done):
   ```bash
   # Create GitHub repo and push
   git remote add origin https://github.com/yourusername/firebase-studio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy via AWS Console**:
   - Go to: https://console.aws.amazon.com/amplify/
   - Click "New app" → "Host web app"
   - Connect GitHub repository
   - Select your repo and branch (main)
   - Build settings will auto-detect `amplify.yml`

3. **Add Environment Variables**:
   ```
   GOOGLE_GENAI_API_KEY = AIzaSyDA0dF7Jj3H17GYDM3i5M46bjFbw5QwMaQ
   ```

4. **Deploy!**

## Files Ready:
✅ amplify.yml - Build configuration
✅ next.config.ts - Updated for Amplify
✅ .env.example - Environment template
✅ Git repository initialized

Your app will be live at: https://[app-id].amplifyapp.com