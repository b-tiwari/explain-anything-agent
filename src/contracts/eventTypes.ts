// src/shared/eventTypes.ts

import type { TopicEventsEnum } from './enums/contractEnums';
import type { TTopicUnit } from './topicTypes';

export type TTopicStartEvent = {
	type: TopicEventsEnum.START;
	topic: string;
	totalUnits: number;
};

export type TTopicUnitEvent = {
	type: TopicEventsEnum.UNIT;
	unit: TTopicUnit;
};

export type TTopicEndEvent = {
	type: TopicEventsEnum.END;
};

export type TTopicEvent = TTopicStartEvent | TTopicUnitEvent | TTopicEndEvent;
