import { ChatOpenAI } from '@langchain/openai';

let mLLM: ChatOpenAI | null = null;

export function initLLM(apiKey: string) {
	if (mLLM) return mLLM;

	mLLM = new ChatOpenAI({
		model: 'gpt-4o-mini',
		temperature: 0.7,
		apiKey,
	});

	return mLLM;
}

export function getLLM(): ChatOpenAI {
	if (!mLLM) {
		throw new Error('LLM not initialized. Call initLLM() first.');
	}
	return mLLM;
}

// export function createLLM(apiKey: string) {
//   return new ChatOpenAI({
//     model: 'gpt-4o-mini',
//     temperature: 0.7,
//     apiKey,
//   });
// }

// export const llm = new ChatOpenAI({
// 	model: 'gpt-4o-mini', // or whatever you’re using
// 	temperature: 0.7,
// 	// apiKey: OPENAI_API_KEY,
// 	apiKey: env.OPENAI_API_KEY, // passed via Worker env
// });
