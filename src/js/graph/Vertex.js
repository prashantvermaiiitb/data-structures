/**
 * Vertex Class to be used in the Graphs
 */
module.exports = class Vertex {
  /**
   * constructor
   * @param {*} data
   */
  constructor(data) {
    this.data = data;
    this.inTree = false;
    this.visited = false;
  }
  /**
   * getting the data
   */
  getData() {
    return this.data;
  }
  /**
   * setting flag for being present in Tree
   * will be used in Minimum spanning tree weighted and dijkstra algorithm
   * @param {*} inTree
   */
  setInTree(inTree) {
    this.inTree = inTree;
  }

  /**
   * Flag to be used in DFS or BFS for checking node is visited or not
   * @param {*} visited
   */
  setVisited(visited) {
    this.visited = visited;
  }
  /**
   * display the vertex
   */
  display() {
    console.log(
      `${this.data} & inTree ${this.inTree} is Visted ${this.visited}`
    );
  }
};
