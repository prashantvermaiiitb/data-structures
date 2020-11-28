/**
 * dfs is the algorithm used in searching in the graphs.
 * it uses stack for maintaining / back-tracking.
 * in this user moves as fast as possible from the Root Node.
 * e.g. for this is MAZE / Circuit Board
 */

var Stack = require("../stack/Stack");

class DepthFirstSearch {
  /**
   * constructing the stack
   */
  constructor() {
    this.stack = new Stack();
  }
  /**
   * Visit the unvisited vertex
   * Mark it
   * Push it on to the stack
   * then recursively
   *  - peek from the stack
   *  - get the unvisited vertex
   *  - if not able to pop-off from the stack
   *  - else push the vertex on the stack and continue
   */
  search(graph, index = 0) {
    const vertexList = graph.getVertexList();

    // console.log(vertexList);

    let root = vertexList[index]; //get root node

    root.setVisited(true); //visit the node
    // console.log(root);
    root.display(); //display the node
    this.stack.push(index); //push this on stack
    while (!this.stack.isEmpty()) {
      let top = graph.getUnvisitedVertex(this.stack.peek());
      //   console.log(top);
      if (top === -1) {
        this.stack.pop();
      } else {
        vertexList[top].setVisited(true);
        vertexList[top].display();
        this.stack.push(top); //pushing the next index
      }
    }
    graph.unMarkAllVertexAsUnvisited(); //un-marking so that next operation could be performed on the graph
  }
}

module.exports = new DepthFirstSearch();
