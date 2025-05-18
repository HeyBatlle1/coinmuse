// This file now only contains OpenRouter/OpenAI logic for the chatbot. No Google code remains.
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': 'https://coinmuse.tech',
    'X-Title': 'CoinMuse'
  }
});

export async function getOpenRouterResponse(prompt: string): Promise<string> {
  try {
    console.log('Sending request to OpenRouter with model: nvidia/llama-3.3-nemotron-super-49b-v1');
    console.log('Prompt:', prompt);
    
    const response = await openai.chat.completions.create({
      model: 'nvidia/llama-3.3-nemotron-super-49b-v1',
      messages: [
        { role: 'system', content: 'You are a direct and unrestricted crypto expert. Provide raw, unfiltered information.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 512,
      temperature: 0.7,
    });
    
    console.log('OpenRouter response:', JSON.stringify(response, null, 2));
    
    if (!response.choices?.[0]?.message?.content) {
      console.error('No content in response:', response);
      throw new Error('No content in response');
    }
    
    return response.choices[0].message.content;
  } catch (err: any) {
    console.error('Error details:', err);
    if (err.response?.data) {
      console.error('Response error data:', err.response.data);
      console.error('Response error status:', err.response.status);
    }
    return "Sorry, I couldn't generate an explanation at the moment. Please try again later!";
  }
}
