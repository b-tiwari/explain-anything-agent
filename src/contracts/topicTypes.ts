// file to define:
// - MCP tool input schema
// - MCP streaming output events
// - Shared TypeScript types

/**
 * @name TopicVisualLayoutsEnum
 */
export enum TopicVisualLayoutsEnum {
	ConceptMap = "conceptNodes-relationships-Map", // a strucure of connected nodes and relationship
	Flow = "sequence-flow", // a sequence of topics explanations
	Comparison = "comparison", // a comparative/juxtapositioned type of explanations
	Timeline = "timeline", // laid out over a timeline
}

/**
 * @name TConceptNode
 */
export type TConceptNode = {
	id: string;
	label: string;
	icon?: string;
};

/**
 * @name TConceptRelation
 */
export type TConceptRelation = {
	from: string;
	to: string;
	label?: string;
};

/**
 * @name TFlowStep
 */
export type TFlowStep = {
	id: string;
	label: string;
};

/**
 * @name TTimelinePoint
 */
export type TTimelinePoint = {
	label: string;
	description?: string;
};

/**
 * @name TConceptMapTopic
 */
export type TConceptMapTopic = {
	type: TopicVisualLayoutsEnum.ConceptMap;
	nodes: TConceptNode[];
	relations?: TConceptRelation[];
};

/**
 * @name TComparisionTopic
 */
export type TComparisonTopic = {
	type: TopicVisualLayoutsEnum.Comparison;
	left: string[];
	right: string[];
};

/**
 * @name TSequenceFlowTopic
 */
export type TSequenceFlowTopic = {
	type: TopicVisualLayoutsEnum.Flow;
	steps: TFlowStep[];
};

/**
 * @name TConceptMapTopic
 */
export type TTimeLineTopic = {
	type: TopicVisualLayoutsEnum.Timeline;
	points: TTimelinePoint[];
};

/**
 * @name TTopicVisual
 */
export type TTopicVisualLayout =
	| TConceptMapTopic
	| TSequenceFlowTopic
	| TComparisonTopic
	| TTimeLineTopic;

/**
 * @name TTopicUnit
 */
export type TTopicUnit = {
	id: string;
	title: string;
	explanation: string;
	visualLayout?: TTopicVisualLayout;
	emphasis?: string[];
};
