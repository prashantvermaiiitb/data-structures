/**
 * Topological sorting works for the Directed graph.
 * This is being used to define the flow of set of tasks
 * that are to be happened one after the another.
 * e.g: courses to be taken in a semister.
 * e.g: capable of showing minimum completion time.
 */
module.exports = function sort(graph, debug = false) {
  let sortedList = new Array(graph.getCurrentVertices());
  // console.log(sortedList);
  let vertexList = graph.getVertexList();
  while (graph.getCurrentVertices() > 0) {
    let currentVertexIndex = graph.findANodeWithNoSuccessor();
    debug && console.log("Vertex with No successor :", currentVertexIndex);
    if (currentVertexIndex === -1) {
      console.log("Graph has cycles ...");
      return;
    } else {
      sortedList[graph.getCurrentVertices() - 1] = vertexList[
        currentVertexIndex
      ].getData();
      debug && console.log(sortedList);
      debug && console.log(graph.displayGraph());
      debug &&
        console.log(
          `count of the vertices before deletion : ${graph.getCurrentVertices()}`
        );
      graph.deleteVertex(currentVertexIndex, debug);
      debug &&
        console.log(
          `count of the vertices after deletion : ${graph.getCurrentVertices()}`
        );
      debug && console.log(graph.displayGraph());
      debug &&
        console.log("------------------------------------------------------");
    }
  }
  return sortedList;
};
