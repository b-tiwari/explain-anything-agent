import type { TextContent } from '@modelcontextprotocol/sdk/types.js';
import * as z from 'zod';
import buildTopicGraph from '@/src/agent/graph/';
import { TopicEventsEnum } from '@/src/contracts/enums/contractEnums';
import type {
	TEventPayloadTypes,
	TTopicCompletedPayload,
	TTopicPlanStartedPayload,
	TTopicUnitCreatedPayload,
} from '@/src/contracts/eventPayloadTypes';

import type { TTopicEvent } from '@/src/contracts/eventTypes';
import type { TMCPToolContext } from './mcpTypeDefs';

const toolInputSchema = z.object({
	topic: z.string(),
	maxUnits: z.number().optional().default(7),
});

const mdlName = '[MCP ExplainTpoic Tool]';
/**
 * @name textContentSchema
 */
const textContentSchema = z.object({
	type: z.literal('text'),
	text: z.string(),
	//**  annotations can be any sort of data that can be useful for the clients/consuemrs
	// specificaly for a specific instance of output content */
	// annotations: z
	// 	.object({
	// 		audience: z.array(z.enum(['user', 'assistant'])).optional(),
	// 		priority: z.number().optional(),
	// 		lastModified: z.string().optional(),
	// 	})
	// 	.optional(),
});

const structuredContent = z.object({
	topic: z.string(),
	units: z.array(
		z.object({
			title: z.string(),
			summary: z.string(),
		}),
	),
});

/**
 * @name textContentSchema
 */
export const toolOutputSchema = z.object({
	content: z.array(textContentSchema),
	structuredContent,
	isError: z.boolean().optional(),
	//**  meta can be any sort of data that can be useful for the clients/consuemrs
	// specificaly for the overall service - like how many tokens have been consumed so far */
	_meta: z.record(z.string(), z.unknown()).optional(),
});

/**
 * @name sendEventOverHttpStream
 */
const sendMCPHttpStreamEvent = (
	transortStream: TMCPToolContext['stream'],
	method: TopicEventsEnum,
	params: Record<string, unknown>,
) => {
	transortStream?.send({
		method,
		params,
	});
};

/**
 * @typedef
 */
export type MCPToolExplainTopicInput = z.infer<typeof toolInputSchema>;

const { PLAN_STARTED, PLAN_COMPLETED, UNIT_CREATED, UNIT_UPDATED } = TopicEventsEnum;

const toolHandler = async (toolInput: MCPToolExplainTopicInput, { signal, stream }: TMCPToolContext) => {
	const fnName = `${mdlName}-[toolHandler]`;

	const { topic, maxUnits } = toolInput;

	console.log(`${fnName} Data From Inputs`, { topic, maxUnits });

	sendMCPHttpStreamEvent(stream, PLAN_STARTED, { topic, maxUnits } satisfies TTopicPlanStartedPayload);

	console.log(`${fnName} sendMCPHttpStreamEvent called`, { topic, maxUnits });

	// build langGraph, get its stream and send that stream over MCPTool's stream

	const graph = buildTopicGraph();
	const units: { title: string; summary: string }[] = [];
	console.log(`${fnName} Graph and Units initialized`);
	const graphStream = await graph.stream({ topic, maxUnits, currentIndex: 0 }, { signal });

	console.log(`${fnName} Graph streaming, stream received`);

	for await (const update of graphStream) {
		console.log(`${fnName} Interating over GraphStream updates`);
		const generateUnitUpdate = update?.generateUnit;
		if (generateUnitUpdate?.units && typeof generateUnitUpdate?.currentIndex === 'number') {
			const unit = generateUnitUpdate.units[generateUnitUpdate.currentIndex];
			const { title, summary } = unit;
			units.push({ title, summary });
			console.log(`${fnName} units data prepared`);
			sendMCPHttpStreamEvent(stream, UNIT_CREATED, { unit, index: generateUnitUpdate.currentIndex });
			console.log(`${fnName} units data Event stream sent`);
		}
	}

	const finalContent: TextContent = {
		type: 'text',
		text: 'Explanation completed',
	};

	return {
		content: [finalContent],
		structuredContent: {
			topic,
			units,
		},
		_meta: {
			totalUnits: units.length,
		},
	};
};

const ExplainTopicMCPTool = {
	title: 'Explain Topic',
	description: 'Explains a given topic by divding it into multiple conceptual units.',
	inputSchema: toolInputSchema,
	outputSchema: toolOutputSchema,
	handler: toolHandler,
};

export default ExplainTopicMCPTool;
