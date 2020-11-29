var Vertex = require("./Vertex");
/**
 * Simple Graph that can be extended further as per the needs
 */
module.exports = class SimpleGraph {
  /**
   * constructor
   * @param {*} maxSize
   */
  constructor(maxSize = 5, maxLimit = Infinity) {
    this.maxSize = maxSize;
    this.currentVertices = 0;
    this.vertexList = new Array(maxSize);
    this.adjacencyMatrix = [];
    this.maxLimit = maxLimit;
    for (let i = 0; i < maxSize; i++) {
      this.adjacencyMatrix.push(new Array(maxSize).fill(maxLimit));
    }
  }
  /**
   * Display the Graph
   */
  displayGraph() {
    let displayInformation = [];
    displayInformation.push(
      "  " +
        this.vertexList
          .filter((value, index) => index < this.currentVertices)
          .map((vertex) => {
            return vertex.getData();
          })
          .join("   ") //catering for 'inf' character count
    );

    for (let i = 0; i < this.currentVertices; i++) {
      displayInformation.push(
        this.vertexList[i].getData() +
          " " +
          this.adjacencyMatrix[i]
            .filter((value, index) => index < this.currentVertices)
            .map((value, index) =>
              value === this.maxLimit
                ? "inf"
                : value + (value < 10 ? "  " : " ")
            )
            .join(" ")
      );
    }
    return displayInformation;
  }
  /**
   * Adding Vertex in Graph
   * @param {*} data
   */
  addVertex(data) {
    this.vertexList[this.currentVertices++] = new Vertex(data);
  }
  /**
   * Adding Edge in the Graph
   * @param {*} source: source vertex
   * @param {*} destination: destination vertex
   * @param {*} weight: Weight on the edge connecting 2
   * @param {*} isDAG : is Directed or Not
   */
  addEdge(source, destination, weight, isDAG = true) {
    this.adjacencyMatrix[source][destination] = weight;
    !isDAG && (this.adjacencyMatrix[destination][source] = weight);
  }
};
