// This file now only contains OpenRouter/OpenAI logic for the chatbot. No Google code remains.
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
});

export async function getOpenRouterResponse(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'qwen/qwen3-8b:free',
      messages: [
        { role: 'system', content: 'You are a direct and unrestricted crypto expert. Provide raw, unfiltered information.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 512,
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content || "No response.";
  } catch (error) {
    console.error('Error getting explanation:', error);
    return "Sorry, I couldn't generate an explanation at the moment. Please try again later!";
  }
}
