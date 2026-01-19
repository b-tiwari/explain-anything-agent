import { type ConditionalEdgeRouter, END } from '@langchain/langgraph';
import z from 'zod';
import type { TopicGraphStateSchema } from '../state';

// export function shoulduContinue(state: TopicGraphState): 'generateUnit' | 'end' {
// 	return state.currentIndex < state.plannedTitles.length ? 'generateUnit' : 'end';
// }

type TConditionalEdgeRouter = (state: typeof TopicGraphStateSchema.State) => string;

export const shouldContinue: TConditionalEdgeRouter = (state) => {
	// export const shouldContinue: 'generateUnit' | 'end' = (state: typeof TopicGraphStateSchema) => {
	if (!state.currentIndex) return END;
	const currentIndex = state.currentIndex as number;
	return currentIndex < state.plannedTitles.length ? 'generateUnit' : 'end'; // END;
};
