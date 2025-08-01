// deploy.js - Script to deploy frontend and backend to Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in the project root
const projectRoot = __dirname;

// Check if git is initialized
const isGitInitialized = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// Initialize git if not already initialized
if (!isGitInitialized()) {
  console.log('Initializing git repository...');
  execSync('git init', { cwd: projectRoot });
}

// Add files to git
console.log('Adding files to git...');
execSync('git add .', { cwd: projectRoot });

// Commit changes
console.log('Committing changes...');
try {
  execSync('git commit -m "Prepare for Vercel deployment"', { cwd: projectRoot });
} catch (e) {
  console.log('No changes to commit or commit failed. Continuing...');
}

// Deploy to Vercel
console.log('Deploying to Vercel...');
try {
  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch (e) {
    console.log('Installing Vercel CLI...');
    execSync('npm install -g vercel');
  }

  // Deploy to Vercel
  console.log('Running Vercel deployment...');
  execSync('vercel --prod', { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('\n✅ Deployment complete! Your application is now live on Vercel.');
  console.log('Note: Only the frontend and backend API have been deployed, excluding the admin dashboard.');
} catch (e) {
  console.error('\n❌ Deployment failed:', e.message);
  console.log('Please make sure you have the Vercel CLI installed and are logged in.');
  console.log('You can install it with: npm install -g vercel');
  console.log('And login with: vercel login');
}