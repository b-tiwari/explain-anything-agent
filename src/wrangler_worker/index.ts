import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { mcpServer } from '@/src/mcp/mcpServer';
import type { Env } from '../../env';
import { initLLM } from '../agent/llm';

// export default {
// 	async fetch(request: Request, env: unknown, contxt: ExecutionContext) {
// 		const transport = new StreamableHTTPServerTransport();
// 		return transport.handleRequest(request, mcpServer);
// 	},
// };

export default {
	async fetch(request: Request, env: Env, contxt: ExecutionContext) {
		const accept = request.headers.get('accept') ?? '';
		initLLM(env.OPENAI_API_KEY);

		if (request.method !== 'POST') {
			return new Response(
				JSON.stringify({
					error: 'MCP endpoint only accepts POST requests',
				}),
				{
					status: 405,
					headers: { 'content-type': 'application/json' },
				},
			);
		}

		// IMPORTANT: Reject non-SSE requests immediately
		if (!accept.includes('text/event-stream') || !accept.includes('application/json')) {
			return new Response(
				JSON.stringify({
					error: 'Not Acceptable: Client must accept text/event-stream',
				}),
				{
					status: 406,
					headers: { 'content-type': 'application/json' },
				},
			);
		}

		const transport = new WebStandardStreamableHTTPServerTransport();

		// Connect mcpServer to transport - this handles all the message wiring
		await mcpServer.connect(transport);

		return transport.handleRequest(request);
	},
};
