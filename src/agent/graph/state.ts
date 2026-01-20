import { ReducedValue, StateSchema } from '@langchain/langgraph';
import * as z from 'zod';
import type { TTopicUnit } from '@/src/contracts/topicTypes';

export const TopicGraphStateSchema = new StateSchema({
	topic: z.string(),
	maxUnits: z.number(),
	plannedTitles: new ReducedValue(
		z.array(z.string()).default(() => []),
		{ reducer: (x, y) => x.concat(y) }, // both x and y are arrays
	),
	currentIndex: z.number(),
	units: new ReducedValue(
		z.array(z.custom<TTopicUnit>()).default(() => []),
		{ reducer: (x, y) => x.concat(y) }, // both x and y are arrays
	),
	// Add a key to the state. We will set this key to determine
	// how we branch.
	// which: z.string(),
	// units: reducerForArrVals(z.custom<TTopicUnit>()),
});
