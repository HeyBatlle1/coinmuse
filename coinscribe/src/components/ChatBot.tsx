import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Removed unused Content type
import { env } from '../config/env';
import { Send, Bot, User, Loader2 } from 'lucide-react'; // Added Loader2
import { motion } from 'framer-motion';

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

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
      // @ts-expect-error The 'temperature' property is not defined in the ModelParams type, but it is a valid option.
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", temperature: 0.9 });
      
      // Updated prompt to ask for suggestions
      const prompt = `You are a friendly crypto expert helping beginners understand cryptocurrency.
                     Please explain in simple terms: ${userMessage}
                     Keep your response concise and easy to understand.
                     After your explanation, provide a list of 2-3 relevant follow-up questions a beginner might ask, formatted like this:
                     Suggestions:
                     1. Follow-up question 1?
                     2. Follow-up question 2?
                     3. Follow-up question 3?`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const rawText = response.text();
      
      const mainContent = stripSuggestions(rawText);
      const suggestions = parseSuggestions(rawText);

      setMessages(prev => [...prev, { role: 'bot', content: mainContent, suggestions }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Updated container styles
    <div className="flex flex-col h-[700px] bg-primary-dark rounded-xl shadow-2xl border border-secondary-gray overflow-hidden">
      {/* Updated header */}
      <div className="p-4 bg-secondary-gray text-light-text rounded-t-xl flex items-center shadow-md">
        <Bot className="w-6 h-6 mr-3 text-accent-blue" />
        <h3 className="text-lg font-semibold">Crypto Assistant</h3>
      </div>

      {/* Updated message area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-secondary-gray scrollbar-track-primary-dark">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start max-w-[85%] ${
                message.role === 'user' 
                  ? 'flex-row-reverse' 
                  : 'flex-row'
              }`}
            >
              {/* Icons */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-accent-blue ml-2' 
                  : 'bg-secondary-gray mr-2'
              }`}>
                {message.role === 'user' 
                  ? <User className="w-4 h-4 text-white" />
                  : <Bot className="w-5 h-5 text-accent-blue" />
                }
              </div>
              {/* Message Bubble */}
              <div
                className={`p-3 rounded-lg shadow-md ${
                  message.role === 'user'
                    ? 'bg-accent-blue text-white rounded-br-none' // User bubble style
                    : 'bg-secondary-gray text-light-text rounded-bl-none' // Bot bubble style
                }`}
              >
                {/* Use pre-wrap to preserve formatting like newlines */}
                <p className="whitespace-pre-wrap">{message.content}</p> 
                
                {/* Render Suggestion Buttons */}
                {message.role === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-600 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-primary-dark hover:bg-gray-700 text-accent-blue font-medium py-1 px-3 rounded-full transition-colors duration-150"
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
        {/* Updated Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-start max-w-[85%] flex-row">
               <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary-gray mr-2">
                 <Bot className="w-5 h-5 text-accent-blue" />
               </div>
               <div className="p-3 rounded-lg shadow-md bg-secondary-gray text-light-text rounded-bl-none">
                  <Loader2 className="w-5 h-5 animate-spin text-accent-blue" />
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Updated Input Area */}
      <form ref={formRef} onSubmit={handleSubmit} className="p-4 border-t border-secondary-gray bg-primary-dark">
        <div className="flex items-center space-x-3 bg-secondary-gray rounded-lg px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about crypto..."
            className="flex-1 bg-transparent text-light-text placeholder-gray-400 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors duration-150 ${
              isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-accent-blue hover:bg-blue-500'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-light-text animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
