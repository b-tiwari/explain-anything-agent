import type { GraphNode } from '@langchain/langgraph';
import type { TTopicUnit } from '@/src/contracts/topicTypes';
import { llm } from '../../llm';
import type { TopicGraphStateSchema } from '../state';

const planUnitsNode: GraphNode<typeof TopicGraphStateSchema.State> = async (state) => {
	const prompt = `
        You are breaking down the topic "${state.topic}".
        Generate ${state.maxUnits} concise learning unit titles.
        Return ONLY a JSON array of strings.
        `;

	const response = await llm.invoke(prompt);
	const titles: string[] = JSON.parse(response.content as string);

	return {
		plannedTitles: titles,
		currentIndex: 0,
		units: [] as TTopicUnit[],
	};
};

export default planUnitsNode;
