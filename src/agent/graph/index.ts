import { END, START, StateGraph } from '@langchain/langgraph';
import generateUnitNode from './nodes/generateUnit';
import planUnitsNode from './nodes/planUnits';
import { shouldContinue } from './nodes/shouldContinue';
import { TopicGraphStateSchema } from './state';

const mdlName = '[LangGraph]';

function buildTopicGraph() {
	const fnName = `${mdlName}-[buildTopicGraph]`;
	const graph = new StateGraph(TopicGraphStateSchema)
		.addNode('planUnits', planUnitsNode)
		.addNode('generateUnit', generateUnitNode);

	console.log(`${fnName} StateGraph instiantiated`);

	graph.addEdge(START, 'planUnits');
	console.log(`${fnName} planUnits Edge added`);
	graph.addEdge('planUnits', 'generateUnit');
	console.log(`${fnName} planUnits to generateUnit Edge added`);

	graph.addConditionalEdges('generateUnit', shouldContinue, {
		generateUnit: 'generateUnit',
		[END]: END,
	});

	console.log(`${fnName} addConditionalEdges`);

	return graph.compile();
}

export default buildTopicGraph;
