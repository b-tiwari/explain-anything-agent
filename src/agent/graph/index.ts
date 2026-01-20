import { END, START, StateGraph } from '@langchain/langgraph';
import generateUnitNode from './nodes/generateUnit';
import planUnitsNode from './nodes/planUnits';
import { shouldContinue } from './nodes/shouldContinue';
import { TopicGraphStateSchema } from './state';

function buildTopicGraph() {
	const graph = new StateGraph(TopicGraphStateSchema)
		.addNode('planUnits', planUnitsNode)
		.addNode('generateUnit', generateUnitNode);

	graph.addEdge(START, 'planUnits');
	graph.addEdge('planUnits', 'generateUnit');
	graph.addConditionalEdges('generateUnit', shouldContinue, {
		generateUnit: 'generateUnit',
		[END]: END,
	});

	return graph.compile();
}

export default buildTopicGraph;
