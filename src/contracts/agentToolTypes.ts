// src/shared/agentToolsTypes.ts

import { z } from "zod";

/**
 * @name AudienceEnum
 */
export enum AudienceEnum {
	Child = "child",
	Beginner = "beginner",
	Intermediate = "intermediate",
	Expert = "expert",
}

/**
 * @name ExplanationStyleEnum
 */
export enum ExplanationStyleEnum {
	Visual = "visual",
	Conceptual = "conceptual",
	AnalogyHeavy = "analogy-heavy",
}

/**
 * @name ExplainTopicInputSchema
 */
export const ExplainTopicInputSchema = z.object({
	topic: z.string().min(1),
	audience: z
		.enum(Object.values(AudienceEnum) as [string, ...string[]])
		.default(AudienceEnum.Beginner),
	style: z
		.enum(Object.values(ExplanationStyleEnum) as [string, ...string[]])
		.default(ExplanationStyleEnum.Visual),
	maxUnits: z.number().min(1).max(10).default(6),
});

export type TExplainTopicInput = z.infer<typeof ExplainTopicInputSchema>;

/**
 * @name ExplainTopicTool
 */
export const ExplainTopicTool = {
	name: "explain_topic",
	description:
		"Explain a topic as a stream of conceptual units, optionally visual",
	inputSchema: ExplainTopicInputSchema,
};
