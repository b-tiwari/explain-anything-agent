// import type { GraphNode } from '@langchain/langgraph';
import { getLLM } from '@/src/agent/llm';
import type { TTopicUnit } from '@/src/contracts/topicTypes';
import { extractTextFromAIMessage } from '../../utils';
import type { TopicGraphStateSchema } from '../state';

// const planUnitsNode: GraphNode<typeof TopicGraphStateSchema.State> = async (state) => {

const planUnitsNode = async (state: typeof TopicGraphStateSchema.State) => {
	const prompt = `
You are breaking down the topic "${state.topic}".
Generate ${state.maxUnits} concise learning unit titles.
Return ONLY a JSON array of strings.
`;
	const llm = getLLM();

	const response = await llm.invoke(prompt);

	const rawText = extractTextFromAIMessage(response);
	const titles = JSON.parse(rawText) as string[];

	return {
		// reducer will append internally
		plannedTitles: titles,
		currentIndex: 0,
	};
};

export default planUnitsNode;
