/**
 * Minimum spanning Tree means we have minimum number
 * of nodes to connect all the vertices present in the graph.
 *
 */

var Stack = require("../stack/Stack");
var Queue = require("../queue/SimpleQueue");

class MinimumSpanningTree {
  constructor() {
    this.stack = new Stack();
    this.queue = Queue;
  }
  /**
   * generating tree through depth first search / traversal
   * @param {*} graph
   */
  getMSTFromDepthFirstSearch(graph, index = 0) {
    console.log("Generating the MST from DFS");
    let vertextList = graph.getVertexList();
    let root = vertextList[index];
    root.setVisited(true);
    this.stack.push(index);
    while (!this.stack.isEmpty()) {
      let currentVertexIndex = this.stack.peek();
      let adjacentVertexIndex = graph.getUnvisitedVertex(currentVertexIndex);
      if (adjacentVertexIndex === -1) {
        this.stack.pop();
      } else {
        vertextList[adjacentVertexIndex].setVisited(true);
        this.stack.push(adjacentVertexIndex);

        graph.displayEdge(currentVertexIndex, adjacentVertexIndex);
      }
    }
  }
  /**
   * generating the tree using BFS
   * @param {*} graph
   */
  getMSTFromBreadthFirstSearch(graph) {
    console.log("Generating the MST from BFS");
    let vertextList = graph.getVertexList();
    const root = vertextList[0];
    root.setVisited(true);
    this.queue.enQueue(0);
    // console.log(this.queue);
    while (!this.queue.isEmpty()) {
      let currentVertexIndex = this.queue.deQueue();
      let adjacentVertexIndex = graph.getUnvisitedVertex(currentVertexIndex);
      while (adjacentVertexIndex !== -1) {
        vertextList[adjacentVertexIndex].setVisited(true);
        this.queue.enQueue(adjacentVertexIndex);
        graph.displayEdge(currentVertexIndex, adjacentVertexIndex);
        adjacentVertexIndex = graph.getUnvisitedVertex(currentVertexIndex);
      }
    }
  }
}

module.exports = new MinimumSpanningTree();
