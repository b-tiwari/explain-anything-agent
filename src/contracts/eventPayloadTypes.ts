// src/shared/eventPayloadTypes.ts

import type { TTopicUnit, TTopicVisualLayout } from './topicTypes';

export type TTopicPlanStartedPayload = {
	topic: string;
	maxUnits: number;
};

export type TTopicPlanCompletedPayload = {
	plannedTitles: string[];
};

export type TTopicUnitCreatedPayload = {
	index: number;
	unit: TTopicUnit;
};

export type TTopicUnitUpdatedPayload = {
	index: number;
	unit: Partial<TTopicUnit>;
};

export type TTopicVisualCreatedPayload = {
	unitIndex: number;
	visual: TTopicVisualLayout;
};

export type TTopicCompletedPayload = {
	totalUnits: number;
};

export type TEventPayloadTypes =
	| TTopicPlanStartedPayload
	| TTopicPlanCompletedPayload
	| TTopicUnitCreatedPayload
	| TTopicUnitUpdatedPayload
	| TTopicVisualCreatedPayload
	| TTopicCompletedPayload;
