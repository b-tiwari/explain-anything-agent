import { END } from '@langchain/langgraph';
import type { TopicGraphStateSchema } from '../state';

export const shouldContinue = (state: typeof TopicGraphStateSchema.State) => {
	const currentIndex = state.currentIndex ?? 0;
	const total = state.plannedTitles.length;

	return currentIndex < total ? 'generateUnit' : END;
};
