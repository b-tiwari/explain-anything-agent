import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import ExplainTopicMCPTool from './mcpTools/ExplainTopic';

// Initialize McpServer
export const mcpServer = new McpServer({
	name: 'explain-anything-agent',
	version: '0.1.0',
	description: 'PoML-backed MCP server for Explain Anything (any Topic)',
});

const { title, description, inputSchema, outputSchema, handler } = ExplainTopicMCPTool;

/**
 * @description Define the 'tool'
 * @name - <<explainTopic>> tool
 */
mcpServer.registerTool('explainTool', { title, description, inputSchema, outputSchema }, handler);
