import type { GraphNode } from '@langchain/langgraph';
import { TopicVisualLayoutsEnum, type TTopicUnit } from '@/src/contracts/topicTypes';
import { llm } from '../../llm';
import type { TopicGraphStateSchema } from '../state';

//"../../../shared/topicTypes";

const strConceptEnum = TopicVisualLayoutsEnum.ConceptMap.toString();
const strCompareEnum = TopicVisualLayoutsEnum.Comparison.toString();
const strFlowEnum = TopicVisualLayoutsEnum.Flow.toString();
const strTimeline = TopicVisualLayoutsEnum.Timeline.toString();

/**
 * @name getPromptForTopicTitle
 */
const getPromptForTopicTitle = (topic: string, title: string) => {
	return `
        Explain the topic "${topic}".
        Current unit title: "${title}"

        Return a JSON object matching this TypeScript type:

        {
            id: string;
            title: string;
            explanation: string;
            visual?: {
                type: "${strConceptEnum}" | "${strFlowEnum}" | "${strCompareEnum}" | "${strTimeline}";
                ...
            };
            emphasis?: string[];
        }`;
};

/**
 * @name generateUnit
 */
const generateUnitNode: GraphNode<typeof TopicGraphStateSchema.State> = async (state) => {
	if (!state.currentIndex || !state.topic) return {};

	const currentIndex = state.currentIndex as number;
	const topic = state.topic as string;

	const title = state.plannedTitles[currentIndex];
	const prompt = getPromptForTopicTitle(topic, title);

	const response = await llm.invoke(prompt);
	const unit = JSON.parse(response.content as string);

	return {
		units: [...state.units, unit] as TTopicUnit[],
		currentIndex: currentIndex + 1,
	};
};

export default generateUnitNode;
