// Instagram API Configuration
// To get your Instagram access token, follow these steps:
// 1. Go to https://developers.facebook.com/
// 2. Create a new app and add Instagram Basic Display product
// 3. Generate an access token for your Instagram account
// 4. Replace the placeholder values below with your actual credentials

export const instagramConfig = {
  // Your Instagram access token
  accessToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || 'YOUR_INSTAGRAM_ACCESS_TOKEN',
  
  // Your Instagram user ID
  userId: import.meta.env.VITE_INSTAGRAM_USER_ID || 'YOUR_USER_ID',
  
  // Number of posts to display
  limit: 6,
  
  // Instagram username for fallback link
  username: 'autoscool_ch',
  
  // Instagram profile URL
  profileUrl: 'https://www.instagram.com/autoscool_ch?igsh=MWtmbnZ2ZnNpZjA1Yg=='
};

// Environment variables setup:
// Add these to your .env file:
// VITE_INSTAGRAM_ACCESS_TOKEN=your_actual_access_token_here
// VITE_INSTAGRAM_USER_ID=your_actual_user_id_here

export default instagramConfig;