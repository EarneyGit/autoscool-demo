# Vercel Deployment Guide

This guide explains how to deploy only the frontend and backend components to Vercel, excluding the admin dashboard. This deployment is specifically configured for testing the Retell voice agent functionality.

## Prerequisites

1. A [Vercel](https://vercel.com/) account
2. [Node.js](https://nodejs.org/) (v18 or later) installed
3. [Vercel CLI](https://vercel.com/docs/cli) installed globally (`npm install -g vercel`)

## Deployment Steps

### Option 1: Using the Deployment Script

We've created a deployment script that automates the process:

```bash
npm run deploy
```

This script will:
1. Initialize a git repository if one doesn't exist
2. Add and commit your changes
3. Install the Vercel CLI if needed
4. Deploy your application to Vercel

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel --prod
   ```

## Configuration Files

The following files have been created/modified to support Vercel deployment:

- `vercel.json`: Configures the build process and routing for Vercel
- `.vercelignore`: Excludes the admin dashboard and other unnecessary files
- `package.json`: Updated scripts for Vercel deployment

## Environment Variables

You'll need to set up the following environment variables in your Vercel project settings:

- `RETELL_API_KEY`: Your Retell API key for voice agent functionality
- `MONGODB_URI`: Your MongoDB connection string (if using a database)
- `JWT_SECRET`: Secret for JWT authentication
- Any other environment variables from your `.env` file

## Testing the Voice Agent

After deployment:

1. Visit your deployed frontend URL
2. Click on the voice agent button to initiate a call
3. Grant microphone permissions when prompted
4. Test the voice interaction with the driving school agent

## Troubleshooting

- If you encounter database connection issues, ensure your MongoDB URI is correctly set in Vercel environment variables
- For voice agent issues, verify that your Retell API key is valid and properly configured
- Check Vercel logs for any deployment or runtime errors

## GitHub Integration

To deploy directly from GitHub:

1. Push your code to the GitHub repository: `https://github.com/EarneyGit/autoscool-demo.git`
2. Connect your Vercel account to GitHub
3. Import the repository in Vercel
4. Configure the build settings to match the `vercel.json` configuration
5. Set up the required environment variables
6. Deploy

This will allow you to automatically deploy updates when you push changes to GitHub.