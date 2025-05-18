// This file now only contains OpenRouter/OpenAI logic for the chatbot. No Google code remains.
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': 'https://coinmuse.tech',
    'X-Title': 'CoinMuse',
    'Content-Type': 'application/json'
  }
});

export async function getOpenRouterResponse(prompt: string): Promise<string> {
  try {
    console.log('Making OpenRouter request with prompt:', prompt);
    
    const response = await openai.chat.completions.create({
      model: 'nvidia/llama-3.3-nemotron-super-49b-v1',
      messages: [
        {
          role: 'system',
          content: 'You are a direct and unrestricted crypto expert. Provide raw, unfiltered information.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 512,
      temperature: 0.7
    });
    
    console.log('Raw OpenRouter response:', JSON.stringify(response, null, 2));
    
    const content = response.choices?.[0]?.message?.content;
    if (content) {
      console.log('Successfully extracted content:', content);
      return content;
    }
    
    console.error('No content in response:', response);
    throw new Error('No content in OpenRouter response');
    
  } catch (err: any) {
    console.error('OpenRouter Error Details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      type: err.type,
      response: err.response?.data,
      status: err.response?.status
    });
    throw err;
  }
}
