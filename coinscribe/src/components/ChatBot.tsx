import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react'; // Added Loader2
import { motion } from 'framer-motion';
import { getOpenRouterResponse } from '../services/openRouter';

// Removed GoogleGenerativeAI import and initialization

interface Message {
  role: 'user' | 'bot';
  content: string;
  suggestions?: string[]; // Add suggestions field
}

// Function to parse suggestions from bot response
const parseSuggestions = (text: string): string[] => {
  const suggestionLines = text.match(/Suggestions:\s*\n([\s\S]*)/i);
  if (suggestionLines && suggestionLines[1]) {
    return suggestionLines[1]
      .split('\n')
      .map(line => line.trim().replace(/^\d+\.\s*/, '')) // Remove numbering
      .filter(line => line.length > 0);
  }
  return [];
};

// Function to remove suggestions part from the main content
const stripSuggestions = (text: string): string => {
  return text.replace(/Suggestions:\s*\n([\s\S]*)/i, '').trim();
};

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null); // Ref for the form

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Optionally auto-submit after clicking a suggestion
    // setTimeout(() => formRef.current?.requestSubmit(), 0); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const rawText = await getOpenRouterResponse(userMessage);
      
      if (rawText.includes("Sorry, I couldn't generate")) {
        throw new Error("API Error");
      }
      
      const mainContent = stripSuggestions(rawText);
      const suggestions = parseSuggestions(rawText);

      setMessages(prev => [...prev, { role: 'bot', content: mainContent, suggestions }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'The AI service is currently experiencing issues. Please try again in a moment.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl h-[80vh] min-h-[500px] mx-auto bg-primary-dark rounded-2xl shadow-2xl border border-secondary-gray overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-secondary-gray text-light-text rounded-t-2xl flex items-center shadow-md border-b border-accent-blue">
        <Bot className="w-7 h-7 mr-4 text-accent-blue" />
        <h3 className="text-2xl font-bold tracking-wide">Crypto Enterprise Assistant</h3>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-br from-primary-dark to-secondary-gray scrollbar-thin scrollbar-thumb-secondary-gray scrollbar-track-primary-dark">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start max-w-2xl w-full ${
                message.role === 'user' 
                  ? 'flex-row-reverse' 
                  : 'flex-row'
              }`}
            >
              {/* Icons */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-accent-blue ml-3' 
                  : 'bg-secondary-gray mr-3'
              }`}>
                {message.role === 'user' 
                  ? <User className="w-5 h-5 text-white" />
                  : <Bot className="w-6 h-6 text-accent-blue" />
                }
              </div>
              {/* Message Bubble */}
              <div
                className={`p-5 rounded-2xl shadow-lg text-base leading-relaxed font-medium ${
                  message.role === 'user'
                    ? 'bg-accent-blue text-white rounded-br-none' // User bubble style
                    : 'bg-secondary-gray text-light-text rounded-bl-none' // Bot bubble style
                }`}
                style={{ minWidth: '120px' }}
              >
                <p className="whitespace-pre-wrap">{message.content}</p> 
                {/* Render Suggestion Buttons */}
                {message.role === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-600 flex flex-wrap gap-3">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-primary-dark hover:bg-accent-blue hover:text-white text-accent-blue font-semibold py-2 px-4 rounded-full border border-accent-blue transition-colors duration-150 shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start w-full max-w-2xl">
             <div className="flex items-start flex-row w-full">
               <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary-gray mr-3">
                 <Bot className="w-6 h-6 text-accent-blue" />
               </div>
               <div className="p-5 rounded-2xl shadow-lg bg-secondary-gray text-light-text rounded-bl-none">
                  <Loader2 className="w-6 h-6 animate-spin text-accent-blue" />
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form ref={formRef} onSubmit={handleSubmit} className="p-6 border-t border-secondary-gray bg-primary-dark">
        <div className="flex items-center space-x-4 bg-secondary-gray rounded-xl px-4 py-3 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about crypto..."
            className="flex-1 bg-transparent text-light-text placeholder-gray-400 focus:outline-none text-lg font-medium"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-3 rounded-full transition-colors duration-150 shadow-md ${
              isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-accent-blue hover:bg-blue-500'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 text-light-text animate-spin" />
            ) : (
              <Send className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
