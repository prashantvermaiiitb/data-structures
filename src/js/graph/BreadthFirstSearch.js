/**
 * Breadth first search or traversal.
 * this is used to get all the adjacent node of the Root then
 * select one of the un-visited vertex and continue again.
 * Here we are going to use Queue for implementation.
 * - Choose a vertex as the current vertex
 * - Visit all the un-visited vertex of the current vertex
 * - visit them , mark them and push them in the Queue
 * - if you are not able to find any un-visited vertex
 * - remove the first element from the Queue and make that as
 * - the current vertex.
 */

var Queue = require("../queue/SimpleQueue");

module.exports = function (graph) {
  let vertexList = graph.getVertexList(); //get the Vertex List
  let startingIndex = 0; //starting from 0
  let root = vertexList[startingIndex]; //get the currentVertex
  //   console.log(root);
  root.setVisited(true); //mark the currentVertex
  root.display(); //display the value

  Queue.enQueue(startingIndex); //push the index of the root in the queue
  while (!Queue.isEmpty()) {
    //while the Queue is not empty
    //remove the element from the Queue and have it as the current Vertex
    let currentVertex = Queue.deQueue(),
      adjacentVertexIndex = graph.getUnvisitedVertex(currentVertex);
    //till you have the adjacent vertex
    while (adjacentVertexIndex !== -1) {
      vertexList[adjacentVertexIndex].setVisited(true); //mark it
      vertexList[adjacentVertexIndex].display(); //visit it
      Queue.enQueue(adjacentVertexIndex);
      adjacentVertexIndex = graph.getUnvisitedVertex(currentVertex);
    }
  }
  graph.unMarkAllVertexAsUnvisited(); //un-marking so that next operation could be performed on the graph
};
