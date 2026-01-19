export type TMCPToolContext = {
	signal: AbortSignal;
	stream?: {
		send(event: unknown): void;
	};
};
