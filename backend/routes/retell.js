const express = require('express');
const Retell = require('retell-sdk');
const router = express.Router();

// Retell configuration
const RETELL_API_KEY = process.env.RETELL_API_KEY || 'key_ed7307271396fb15ad6b0f2b688e';
const RETELL_API_BASE_URL = 'https://api.retellai.com';

// Initialize Retell client
const retellClient = new Retell({
  apiKey: RETELL_API_KEY,
});

/**
 * Test agent existence
 * GET /api/retell/test-agent/:agentId
 */
router.get('/test-agent/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;

    const response = await fetch(`${RETELL_API_BASE_URL}/get-agent/${agentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Agent test error:', errorData);
      return res.status(response.status).json({ 
        error: 'Agent not found or invalid',
        details: errorData 
      });
    }

    const data = await response.json();
    res.json({
      success: true,
      agent: {
        agent_id: data.agent_id,
        agent_name: data.agent_name,
        voice_id: data.voice_id
      }
    });

  } catch (error) {
    console.error('Error testing agent:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Create a new web call with Retell AI
 * POST /api/retell/register-call
 */
router.post('/register-call', async (req, res) => {
  try {
    const { agent_id, llm_id } = req.body;

    if (!agent_id) {
      return res.status(400).json({ error: 'agent_id is required' });
    }

    // Call Retell API to create web call using SDK
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: agent_id,
      metadata: {
        source: 'website_chatbox',
        timestamp: new Date().toISOString()
      }
    });
    
    // Return the call_id and access_token to the frontend
    res.json({
      call_id: webCallResponse.call_id,
      access_token: webCallResponse.access_token,
      agent_id: agent_id
    });

  } catch (error) {
    console.error('Error registering call:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Get call details
 * GET /api/retell/call/:callId
 */
router.get('/call/:callId', async (req, res) => {
  try {
    const { callId } = req.params;

    const response = await fetch(`${RETELL_API_BASE_URL}/get-call/${callId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Retell API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to get call details',
        details: errorData 
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error getting call details:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * End a call
 * POST /api/retell/end-call
 */
router.post('/end-call', async (req, res) => {
  try {
    const { call_id } = req.body;

    if (!call_id) {
      return res.status(400).json({ error: 'call_id is required' });
    }

    const response = await fetch(`${RETELL_API_BASE_URL}/end-call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        call_id: call_id
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Retell API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to end call',
        details: errorData 
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error ending call:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

module.exports = router;