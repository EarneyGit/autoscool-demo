import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Bot, Headphones, Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import retellService from '@/services/retellService';

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { t } = useLanguage();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleAIChat = async () => {
    try {
      setIsConnecting(true);
      await retellService.startConversation();
      setIsVoiceCallActive(true);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      alert('Failed to start voice conversation. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEndVoiceCall = async () => {
    try {
      await retellService.stopConversation();
      setIsVoiceCallActive(false);
    } catch (error) {
      console.error('Failed to end voice conversation:', error);
    }
  };

  const handleCustomerSupport = () => {
    // TODO: Implement customer support chat functionality
    console.log('Opening customer support...');
    setIsOpen(false);
  };

  // Check if voice call is active on component mount
  useEffect(() => {
    setIsVoiceCallActive(retellService.isActive());
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Options Panel */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 w-80 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-base">{t('chat.howCanWeHelp')}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {/* AI Agent Option */}
            <Button
              onClick={handleAIChat}
              disabled={isConnecting || isVoiceCallActive}
              variant="outline"
              className="w-full justify-start text-left h-auto p-4 hover:bg-blue-50 hover:border-blue-300 border-gray-200 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-2.5 rounded-full group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-200">
                  {isConnecting ? (
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Phone className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-800">
                    {isConnecting ? 'Connecting...' : 'Talk to AI Agent'}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {isConnecting ? 'Starting voice conversation...' : 'Start a voice conversation with our AI'}
                  </div>
                </div>
              </div>
            </Button>

            {/* Customer Support Option */}
            <Button
              onClick={handleCustomerSupport}
              variant="outline"
              className="w-full justify-start text-left h-auto p-4 hover:bg-green-50 hover:border-green-300 border-gray-200 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-2.5 rounded-full group-hover:from-green-200 group-hover:to-green-300 transition-all duration-200">
                  <Headphones className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-800">{t('chat.customerSupport')}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t('chat.supportDescription')}</div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Voice Call Active Indicator */}
      {isVoiceCallActive && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-xl shadow-lg p-4 w-80 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Mic className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-sm text-green-800">Voice Call Active</div>
                <div className="text-xs text-green-600">Speaking with AI Agent</div>
              </div>
            </div>
            <Button
              onClick={handleEndVoiceCall}
              variant="outline"
              size="sm"
              className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
            >
              <PhoneOff className="h-4 w-4 mr-1" />
              End Call
            </Button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90'
        } border-4 border-white`}
        size="lg"
      >
        <div className="relative">
          {isOpen ? (
            <X className="h-7 w-7 text-white transition-transform duration-200" />
          ) : (
            <MessageCircle className="h-7 w-7 text-white transition-transform duration-200" />
          )}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </Button>
    </div>
  );
};

export default ChatBox;