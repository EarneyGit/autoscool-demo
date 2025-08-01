# Retell Voice Agent Integration

This document describes the integration of Retell AI voice agent into the website's chatbox.

## Overview

The Retell voice agent has been successfully integrated into the existing ChatBox component, allowing users to have voice conversations with an AI agent directly from the website.

## Configuration

### Retell Credentials
- **Agent ID**: `agent_c3bb9122660cb76a62d076b330`
- **LLM ID**: `llm_660757682a5e0430737fe9901119`
- **API Key**: `key_ed7307271396fb15ad6b0f2b688e` (stored securely in backend)

## Implementation Details

### Frontend Components

1. **ChatBox Component** (`frontend/src/components/ChatBox.tsx`)
   - Updated to include voice call functionality
   - Shows "Talk to AI Agent" button instead of generic "Talk to AI"
   - Displays voice call status and controls when active
   - Includes loading states and error handling

2. **Retell Service** (`frontend/src/services/retellService.ts`)
   - Handles Retell SDK integration
   - Manages conversation lifecycle (start/stop)
   - Communicates with backend API for call registration
   - Provides event listeners for conversation status

### Backend API

3. **Retell Routes** (`backend/routes/retell.js`)
   - `/api/retell/register-call` - Registers new voice calls with Retell API
   - `/api/retell/call/:callId` - Gets call details
   - `/api/retell/end-call` - Ends active calls
   - Securely handles API key and communicates with Retell services

## Features

### User Interface
- **Voice Call Button**: Replaces the generic "Talk to AI" with "Talk to AI Agent"
- **Loading State**: Shows spinner and "Connecting..." during call setup
- **Active Call Indicator**: Green panel showing call is active with microphone icon
- **End Call Button**: Red button to terminate the voice conversation
- **Error Handling**: User-friendly error messages for failed connections

### Technical Features
- **Real-time Voice**: Uses WebRTC for real-time voice communication
- **Secure API**: Backend handles all Retell API communications
- **Event Management**: Proper event listeners for conversation lifecycle
- **State Management**: React state management for UI updates

## Usage

1. **Starting a Voice Call**:
   - Click the chat button in the bottom-right corner
   - Click "Talk to AI Agent"
   - Allow microphone permissions when prompted
   - Wait for connection ("Connecting..." state)
   - Start speaking when the green "Voice Call Active" panel appears

2. **During the Call**:
   - Speak naturally to the AI agent
   - The AI will respond with voice
   - The green panel shows the call is active

3. **Ending the Call**:
   - Click the "End Call" button in the green panel
   - Or the call will automatically end after 30 seconds of silence

## Dependencies

### Frontend
- `retell-client-js-sdk`: Official Retell client SDK for web applications
- React hooks for state management
- Lucide React icons for UI elements

### Backend
- Express.js routes for API endpoints
- Fetch API for Retell API communication
- CORS configuration for frontend-backend communication

## Security

- API keys are stored securely in the backend
- Frontend never directly accesses Retell API
- All sensitive operations go through backend proxy
- CORS properly configured for secure communication

## Testing

1. Ensure both frontend (port 5173) and backend (port 8000) servers are running
2. Open the website in a browser
3. Click the chat button and test the "Talk to AI Agent" functionality
4. Verify microphone permissions are requested
5. Test voice conversation with the AI agent
6. Test ending the call functionality

## Troubleshooting

### Common Issues

1. **Import Error: RetellClientSdk not found**
   - **Fixed**: Use `RetellWebClient` instead of `RetellClientSdk`
   - Correct import: `import { RetellWebClient } from 'retell-client-js-sdk';`

2. **Event Listener Errors**
   - **Fixed**: Use correct event names:
     - `call_started` instead of `onConversationStarted`
     - `call_ended` instead of `onConversationEnded`
     - `error` instead of `onError`
     - `update` instead of `onUpdate`

3. **API Endpoint Issues**
   - **Fixed**: Use `create-web-call` endpoint instead of `register-call`
   - Backend now returns `access_token` for web calls

4. **"Failed to start voice conversation"**:
   - Check backend server is running on port 8000
   - Verify Retell API credentials are correct
   - Check browser console for detailed error messages

5. **Microphone not working**:
   - Ensure browser has microphone permissions
   - Check if microphone is being used by other applications
   - Try refreshing the page and granting permissions again

6. **Call not connecting**:
   - Verify internet connection
   - Check if Retell services are operational
   - Review backend logs for API errors

### Debug Information

- Frontend logs: Check browser console for Retell SDK events
- Backend logs: Check terminal running the backend server
- Network requests: Use browser dev tools to inspect API calls

## Future Enhancements

- Add call recording functionality
- Implement call analytics and metrics
- Add support for multiple languages
- Include call transcription display
- Add voice settings (speed, tone, etc.)