/**
 * @name
 */
export enum TopicEventsEnum {
	START = 'topic:start',
	UNIT = 'topic:get:unit',
	END = 'topic:end',

	PLAN_STARTED = 'topic.plan.started',
	PLAN_COMPLETED = 'topic.plan.completed',

	UNIT_CREATED = 'topic.unit.created',
	UNIT_UPDATED = 'topic.unit.updated',

	VISUAL_CREATED = 'topic.visual.created',

	COMPLETED = 'topic.completed',
	ERROR = 'topic.error',
}
