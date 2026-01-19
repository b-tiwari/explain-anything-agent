import type { TopicEventsEnum } from './enums/contractEnums';

import type {
	TTopicCompletedPayload,
	TTopicPlanCompletedPayload,
	TTopicPlanStartedPayload,
	TTopicUnitCreatedPayload,
	TTopicUnitUpdatedPayload,
	TTopicVisualCreatedPayload,
} from './eventPayloadTypes';

export type TopicNotificationMap = {
	[TopicEventsEnum.PLAN_STARTED]: TTopicPlanStartedPayload;
	[TopicEventsEnum.PLAN_COMPLETED]: TTopicPlanCompletedPayload;
	[TopicEventsEnum.UNIT_CREATED]: TTopicUnitCreatedPayload;
	[TopicEventsEnum.UNIT_UPDATED]: TTopicUnitUpdatedPayload;
	[TopicEventsEnum.VISUAL_CREATED]: TTopicVisualCreatedPayload;
	[TopicEventsEnum.COMPLETED]: TTopicCompletedPayload;
};
