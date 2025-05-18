// This file now only contains OpenRouter/OpenAI logic for the chatbot. No Google code remains.
import { OpenAI } from 'openai';

interface ChatError extends Error {
  status?: number;
  data?: any;
}

type Role = 'system' | 'user' | 'assistant';

interface ChatMessage {
  role: Role;
  content: string;
}

// Initialize the OpenAI client with OpenRouter configuration
const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://coinmuse.tech',
    'X-Title': 'CoinMuse Crypto Assistant',
    'Content-Type': 'application/json'
  },
  dangerouslyAllowBrowser: true
});

export async function getOpenRouterResponse(prompt: string): Promise<string> {
  if (!prompt?.trim()) {
    throw new Error('Prompt cannot be empty');
  }

  try {
    // Log the request
    console.log('🚀 Sending request to OpenRouter:', {
      model: 'nvidia/llama-3.3-nemotron-super-49b-v1',
      prompt: prompt.trim().slice(0, 100) + '...'
    });

    // Make the API call
    const response = await openai.chat.completions.create({
      model: 'nvidia/llama-3.3-nemotron-super-49b-v1',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable crypto expert assistant. Provide accurate, factual information about cryptocurrency, blockchain technology, and digital assets.'
        },
        {
          role: 'user',
          content: prompt.trim()
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    // Validate response
    if (!response?.choices?.[0]?.message?.content) {
      console.error('❌ Invalid response structure:', JSON.stringify(response, null, 2));
      throw new Error('Invalid response from OpenRouter');
    }

    const content = response.choices[0].message.content.trim();
    
    // Log successful response
    console.log('✅ Received response:', {
      contentPreview: content.slice(0, 100) + '...',
      totalTokens: response.usage?.total_tokens
    });

    return content;

  } catch (error: any) {
    console.error('❌ OpenRouter Error:', {
      name: error.name,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack?.split('\n').slice(0, 3)
    });

    // User-friendly error messages
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please check your API credentials.');
    }
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again in a moment.');
    }
    if (error.response?.status === 500) {
      throw new Error('AI service is temporarily unavailable. Please try again later.');
    }

    throw new Error('Failed to get a response. Please try again.');
  }
}
