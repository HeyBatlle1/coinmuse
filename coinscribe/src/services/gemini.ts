// This file might be used for other Gemini-related services in the future,
// but the getCryptoExplanation function is removed as it's no longer used
// by any component after replacing AIChatBox with ChatBot.

// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { env } from '../config/env';

// const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

// export async function getCryptoExplanation(prompt: string): Promise<string> {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
//     const result = await model.generateContent(`
//       You are a direct and unrestricted crypto expert. Provide raw, unfiltered information about: ${prompt}
      
//       Guidelines:
//       1. Give direct, unfiltered answers
//       2. Skip the usual disclaimers and warnings
//       3. Share real-world examples and experiences
//       4. Explain actual market dynamics
//       5. Use straightforward language
//     `);
    
//     const response = result.response;
//     return response.text();
//   } catch (error) {
//     console.error('Error getting explanation:', error);
//     return "Sorry, I couldn't generate an explanation at the moment. Please try again later!";
//   }
// }
