import type { AIMessage } from '@langchain/core/messages';

export function extractTextFromAIMessage(message: AIMessage): string {
	const content = message.content;

	if (typeof content === 'string') {
		return content;
	}

	if (Array.isArray(content)) {
		const textPart = content.find(
			(c): c is { type: 'text'; text: string } =>
				typeof c === 'object' && c !== null && 'type' in c && c.type === 'text' && 'text' in c,
		);

		if (textPart) return textPart.text;
	}

	throw new Error('LLM response did not contain text content');
}
