# AWS Amplify Deployment Guide

## Prerequisites
- AWS Account
- GitHub repository with your code
- Google GenAI API Key

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Amplify deployment"
git push origin main
```

### 2. Deploy to AWS Amplify

#### Option A: Using AWS Console
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Select your repository and branch (main)
5. Amplify will auto-detect the build settings from `amplify.yml`

#### Option B: Using AWS CLI
```bash
# Install AWS CLI if not already installed
npm install -g @aws-amplify/cli

# Configure AWS credentials
aws configure

# Initialize Amplify project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### 3. Configure Environment Variables
In the Amplify Console:
1. Go to your app → App settings → Environment variables
2. Add the following variable:
   - Key: `GOOGLE_GENAI_API_KEY`
   - Value: `AIzaSyDA0dF7Jj3H17GYDM3i5M46bjFbw5QwMaQ`

### 4. Build Configuration
Your `amplify.yml` is already configured for Next.js:
- Uses `npm ci` for faster, reliable installs
- Runs `npm run build` to build the app
- Caches `node_modules` for faster builds
- Outputs to `.next` directory

### 5. Custom Domain (Optional)
1. In Amplify Console → Domain management
2. Add your custom domain
3. Amplify will handle SSL certificates automatically

## Important Notes

- **API Routes**: Your app uses Next.js API routes (`/api/chat`) which require server-side rendering
- **Environment Variables**: Make sure to add your Google GenAI API key in Amplify environment variables
- **Build Time**: First deployment may take 5-10 minutes
- **Auto-Deploy**: Amplify will automatically redeploy when you push to your connected branch

## Troubleshooting

### Build Fails
- Check build logs in Amplify Console
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### API Routes Not Working
- Ensure you're using Amplify Gen 2 or Amplify with Next.js SSR support
- Check that `output: 'standalone'` is set in `next.config.ts`

### Environment Variables
- Variables must be set in Amplify Console, not just in `.env` file
- Restart the app after adding environment variables

## Cost Estimation
- Amplify hosting: ~$1-5/month for small apps
- Data transfer: Minimal for typical usage
- Use [AWS Pricing Calculator](https://calculator.aws) for detailed estimates