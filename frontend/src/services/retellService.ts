import { RetellWebClient } from 'retell-client-js-sdk';

class RetellService {
  private client: RetellWebClient;
  private isInitialized: boolean = false;
  private isConversationActive: boolean = false;
  private callId: string | null = null;

  // Retell configuration
  private readonly AGENT_ID = 'agent_c3bb9122660cb76a62d076b330';
  private readonly LLM_ID = 'llm_660757682a5e0430737fe9901119';
  private readonly API_KEY = 'key_ed7307271396fb15ad6b0f2b688e';

  constructor() {
    this.client = new RetellWebClient();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.client.on('call_started', () => {
      console.log('Retell call started');
      this.isConversationActive = true;
    });

    this.client.on('call_ended', () => {
      console.log('Retell call ended');
      this.isConversationActive = false;
      this.callId = null;
    });

    this.client.on('error', (error) => {
      console.error('Retell error:', error);
      this.isConversationActive = false;
      this.callId = null;
    });

    this.client.on('update', (update) => {
      console.log('Retell update:', update);
    });
  }

  async registerCall(): Promise<string> {
    try {
      // Call backend API to register the call with Retell
      const response = await fetch('http://localhost:8000/api/retell/register-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: this.AGENT_ID,
          llm_id: this.LLM_ID,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register call');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error registering call:', error);
      throw error;
    }
  }

  async startConversation(): Promise<void> {
    try {
      if (this.isConversationActive) {
        console.warn('Conversation is already active');
        return;
      }

      // Register the call first
      const accessToken = await this.registerCall();
      
      // Start the call
       await this.client.startCall({
         accessToken: accessToken,
         sampleRate: 24000,
         emitRawAudioSamples: false
       });
       
       this.isInitialized = true;
    } catch (error) {
      console.error('Error starting Retell conversation:', error);
      throw error;
    }
  }

  async stopConversation(): Promise<void> {
    try {
      if (!this.isConversationActive) {
        console.warn('No active conversation to stop');
        return;
      }

      await this.client.stopCall();
      this.isConversationActive = false;
      this.callId = null;
    } catch (error) {
      console.error('Error stopping Retell conversation:', error);
      throw error;
    }
  }

  isActive(): boolean {
    return this.isConversationActive;
  }

  getCallId(): string | null {
    return this.callId;
  }
}

// Export a singleton instance
export const retellService = new RetellService();
export default retellService;