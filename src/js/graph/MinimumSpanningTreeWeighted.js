/**
 * Finding the minimum spanning tree for the the weighted graph
 * Idea is to have all the nodes connected with minimum weights
 * Here each node will determine where to connect next based on the current information
 * without considering the OVERALL cost
 */

var SimpleGraph = require("./SimpleGraph");
/**
 * Data structure for maintaining the Edges and weight on them.
 * This will be used to pick the minimum Edge each time when asked.
 * Minimum edge is present in the last of the Array (size-1).
 * Every-time edge is inserted it will try to place the edge in proper place.
 */
class PriorityQueue {
  /**
   * constructor
   * @param {*} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.collection = new Array(maxSize);
    this.size = 0;
  }
  /**
   * Empty or not
   */
  isEmpty() {
    return this.size === 0;
  }
  /**
   * checking isFull or not
   */
  isFull() {
    return this.size == this.maxSize;
  }
  /**
   * Peek the node at index N
   * @param {*} index
   */
  peekN(index) {
    return this.collection[index];
  }
  /**
   * Peek the minimum elements that's at the end
   */
  peekMin() {
    return this.collection[this.size - 1];
  }
  /**
   * Putting the method in the priority queue
   * @param {*} sourceVertexIndex
   * @param {*} destinationVertexIndex
   * @param {*} weight
   */
  putInPriorityQueue(sourceVertexIndex, destinationVertexIndex, weight) {
    let minEdgeIndex = this.find(destinationVertexIndex);
    if (minEdgeIndex !== -1) {
      let minimumEdge = this.peekN(minEdgeIndex);
      let oldDistance = minimumEdge.weight;
      if (oldDistance > weight) {
        this.removeN(minEdgeIndex);
        let newEdge = new Edge(
          sourceVertexIndex,
          destinationVertexIndex,
          weight
        );
        this.insert(newEdge);
      }
    } else {
      let newEdge = new Edge(sourceVertexIndex, destinationVertexIndex, weight);
      this.insert(newEdge);
    }
  }
  /**
   * Inserting Edge in the PQ
   * @param {*} edge
   */
  insert(edge) {
    let j = 0;
    for (; j < this.size; j++) {
      if (edge.weight >= this.collection[j].weight) {
        break;
      }
    }
    for (let k = this.size - 1; k >= j; k--) {
      this.collection[k + 1] = this.collection[k];
    }
    this.collection[j] = edge;
    this.size++;
  }
  /**
   * Finding the index of an Edge with same destination Vertex Index.
   * IDea is to have only 1 entry for the Destination at a time.
   * @param {*} destinationVertexIndex
   */
  find(destinationVertexIndex) {
    for (let j = 0; j < this.size; j++) {
      if (this.collection[j].destination === destinationVertexIndex) {
        return j;
      }
    }
    return -1;
  }
  /**
   * Getting the number of elements in the priority queue
   */
  getSize() {
    return this.size;
  }
  /**
   * Remove the minimum element in the Queue
   */
  removeMin() {
    let minItem = this.collection[this.size - 1];
    delete this.collection[this.size - 1];
    this.size--;
    return minItem;
  }
  /**
   * Removing the edge at the Nth index
   * @param {*} index
   */
  removeN(index) {
    for (let j = index; j < this.size; j++) {
      this.collection[j] = this.collection[j + 1];
    }
    this.size--;
  }
}
/**
 * This will be the object stored by the Priority Queue
 */
class Edge {
  constructor(source, destination, weight) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
  }
}

/**
 * Graph class for the project
 */
class Graph extends SimpleGraph {
  constructor(maxSize = 5) {
    super(maxSize, Infinity);
    this.nTree = 0; //number of nodes in the Shortest Path Tree
    this.PQ = new PriorityQueue(maxSize);
  }

  /**
   * searching for the minimum spanning tree
   */
  findMinimumSpanningTree(debug = true) {
    let currentVertexIndex = 0,
      result = [];
    while (this.nTree < this.currentVertices - 1) {
      debug &&
        console.log(
          `currentVertexIndex is : ${currentVertexIndex}, this is ${this.vertexList[
            currentVertexIndex
          ].getData()}`
        );
      this.vertexList[currentVertexIndex].inTree = true;
      this.nTree++;

      for (let j = 0; j < this.currentVertices; j++) {
        if (j === currentVertexIndex || this.vertexList[j].inTree) {
          // debug &&
          //   console.log(`vertex is already in Tree : `, this.vertexList[j]);
          continue;
        }
        let distance = this.adjacencyMatrix[currentVertexIndex][j];
        if (distance === this.maxLimit) {
          // debug &&
          //   console.log(`vertex is @${this.maxLimit} : `, this.vertexList[j]);
          continue;
        }
        debug &&
          console.log(
            `using vertex to Proceed :`,
            this.vertexList[j],
            "with distance ",
            distance
          );

        /**
         * for current vertex insert all the edges in Queue
         * this queue will be doing sorting of the edges based on
         * the weights placed.
         */
        this.PQ.putInPriorityQueue(currentVertexIndex, j, distance);
        debug && console.log(this.PQ);
      }
      // debug && console.log(this.PQ);
      debug && console.log(`number of nodes in Tree ${this.nTree}`);

      if (this.PQ.getSize() === 0) {
        console.log(`GRAPH is not connected `);
        return;
      }
      let currentMinimumEdge = this.PQ.removeMin();

      let sourceVertex = currentMinimumEdge.source;
      currentVertexIndex = currentMinimumEdge.destination;

      result.push(
        `${this.vertexList[sourceVertex].getData()}${this.vertexList[
          currentVertexIndex
        ].getData()}(${currentMinimumEdge.weight})`
      );
    }
    return result.length > 0 ? result.join("-->") : "Some Error happened";
  }

  static demo() {
    let myGraph = new Graph(6);

    myGraph.addVertex("A"); //0
    myGraph.addVertex("B"); //1
    myGraph.addVertex("C"); //2
    myGraph.addVertex("D"); //3
    myGraph.addVertex("E"); //4
    myGraph.addVertex("F"); //5

    myGraph.addEdge(0, 1, 6, false); //AB
    myGraph.addEdge(0, 3, 4, false); //AD
    myGraph.addEdge(1, 2, 10, false); //BC
    myGraph.addEdge(1, 3, 7, false); //BD
    myGraph.addEdge(1, 4, 7, false); //BE
    myGraph.addEdge(2, 3, 8, false); //CD
    myGraph.addEdge(2, 4, 5, false); //CE
    myGraph.addEdge(2, 5, 6, false); //CF
    myGraph.addEdge(3, 4, 12, false); //DE
    myGraph.addEdge(4, 5, 7, false); //EF

    console.log(myGraph.displayGraph());
    console.log(myGraph.findMinimumSpanningTree(false));
  }
}

Graph.demo();
