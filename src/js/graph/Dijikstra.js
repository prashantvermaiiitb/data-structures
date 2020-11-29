/**
 * Algorithm is to search for the shortest path from the source to destination.
 * Here past information is also being used while deciding the next set of edges in the new tree.
 * Though it starts with 1 vertex as the ORIGIN and tries to find the minimum distance information
 * towards destination, eventually results in finding shortest distance to all the other vertices
 * in the Graph.
 * Below are the pre-requisites Objects :-
 * - DistParent
 *   - destination
 *   - distance
 * - Vertex
 *   - data
 *   - inTree
 * - Graph :-
 *  - vertexCount
 *  - currentVertices
 *  - adjacencyList
 *  - adjacencyMatrix
 * Below are the Data structures that are being used in the Algorithm.
 * - spath[] :-
 *   shortest path Array which will be created and iterated during the entire process
 *   spath[] contains DistanceParent() Objects which shows the distance from the parent
 *   finally this will be printed on the screen to show the distance metrics
 */

class Vertex {
  constructor(data) {
    this.data = data;
    this.inTree = false;
  }
  getData() {
    return this.data;
  }
  setInTree(inTree) {
    this.inTree = inTree;
  }
  display() {
    console.log(`${this.data} & inTree ${this.inTree}`);
  }
}

class DistanceParent {
  constructor(index, distance) {
    this.index = index;
    this.distance = distance;
  }
}

class Graph {
  constructor(maxSize = 5) {
    this.maxSize = maxSize;
    this.currentVertices = 0;
    this.vertexList = new Array(maxSize);
    this.adjacencyMatrix = [];
    for (let i = 0; i < maxSize; i++) {
      this.adjacencyMatrix.push(new Array(maxSize).fill(Infinity));
    }
    this.shortestPaths = []; //max number of paths is Vertices-1
    this.nTree = 0; //number of nodes in the Shortest Path Tree
  }
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
            .map((value, index) => (value === Infinity ? "inf" : value))
            .join(" ")
      );
    }
    return displayInformation;
  }
  addVertex(data) {
    this.vertexList[this.currentVertices++] = new Vertex(data);
  }
  addEdge(source, destination, weight) {
    this.adjacencyMatrix[source][destination] = weight;
  }

  // while all vertices are in tree
  //choose minimum entry in shortestPaths[]
  // make that dest as the current vertex
  searchShortestPaths(debug = true) {
    //choosing Root [0] as the starting point
    let currentVertexIndex = 0,
      distanceUptoCurrentVertexFromStart;
    this.vertexList[currentVertexIndex].setInTree(true);
    this.nTree++;

    //creation of the ShortestPaths[]
    for (let j = 0; j < this.currentVertices; j++) {
      let distance = this.adjacencyMatrix[currentVertexIndex][j];
      this.shortestPaths.push(new DistanceParent(currentVertexIndex, distance));
    }

    debug &&
      console.log(
        "initial Shortest Path Array created ",
        this.displayShortestPaths(currentVertexIndex)
      );

    //untill all the vertices are added in the tree
    while (this.nTree < this.currentVertices) {
      let {
        minimumIndex,
        minimumDistance,
      } = this.findMinimumEntryIndexInShortestPathArray();
      if (minimumDistance === Infinity) {
        console.log("There are still vertices that are un-reachable !!");
        return;
      } else {
        currentVertexIndex = minimumIndex;
        distanceUptoCurrentVertexFromStart = minimumDistance;
      }
      //mark the entries in the vertex List as used in the Tree
      this.vertexList[currentVertexIndex].setInTree(true);
      this.nTree++;

      debug &&
        console.log(
          `Making (${this.vertexList[
            currentVertexIndex
          ].getData()}): current vertex in the Tree with minimum distance : ${minimumDistance} @index : ${minimumIndex} making current Nodes to :- ${
            this.nTree
          }`
        );
      //update the shortest path array
      this.performUpdatesInShortestPathArray(
        currentVertexIndex,
        distanceUptoCurrentVertexFromStart,
        debug
      );
      debug && console.log(this.displayShortestPaths(currentVertexIndex));
    }

    console.log(this.displayShortestPaths(currentVertexIndex));
    this.nTree = 0;
    for (let j = 0; j < this.currentVertices; j++) {
      this.vertexList[j].setInTree(false);
    }
  }
  /**
   * Performing the update on the shortest path array so that each entry will have updated
   * minimum path from the current vertex that's under consideration and also from the starting vertex
   * overall
   * @param {*} currentVertexIndex
   * @param {*} distanceUptoCurrentVertexFromStart
   */
  performUpdatesInShortestPathArray(
    currentVertexIndex, //B
    distanceUptoCurrentVertexFromStart, //AB
    debug
  ) {
    let column = 1;
    // B C D E
    debug &&
      console.log(
        `-----Performing Updates in the shortest Path array START ------`
      );
    for (column = 1; column < this.currentVertices; column++) {
      if (this.vertexList[column].inTree) {
        debug &&
          console.log(
            `(${this.vertexList[
              column
            ].getData()}) is already added in the Tree so ignoring..`
          );
        continue;
      }
      debug &&
        console.log(
          `Performing Update using (${this.vertexList[column].getData()})...`
        );
      let currentToFringeDistance = this.adjacencyMatrix[currentVertexIndex][
        column
      ]; //BC , BE
      let startToFringeDistance =
        distanceUptoCurrentVertexFromStart + currentToFringeDistance;
      let distanceInShortestPathArray = this.shortestPaths[column].distance; // AC

      //   debug &&
      //     console.log(
      //       `Original Distance (${this.vertexList[
      //         this.shortestPaths[column].index
      //       ].getData()}${this.vertexList[
      //         column
      //       ].getData()}) is ${distanceInShortestPathArray}`
      //     ); //AC
      debug &&
        console.log(
          `Calculated Distance for (${this.vertexList[
            this.shortestPaths[column].index
          ].getData()}${this.vertexList[
            currentVertexIndex
          ].getData()}) is ${distanceUptoCurrentVertexFromStart}, (${this.vertexList[
            currentVertexIndex
          ].getData()}${this.vertexList[
            column
          ].getData()}) is ${currentToFringeDistance} making (${this.vertexList[
            this.shortestPaths[column].index
          ].getData()}${this.vertexList[
            column
          ].getData()}) to ${startToFringeDistance} which is currently ${distanceInShortestPathArray}, ${
            startToFringeDistance < distanceInShortestPathArray
              ? "will be considered."
              : "will be ignored."
          }`
        ); //BC

      if (startToFringeDistance < distanceInShortestPathArray) {
        this.shortestPaths[column].distance = startToFringeDistance;
        this.shortestPaths[column].index = currentVertexIndex;
      }
    }
    debug &&
      console.log(
        `-----Performing Updates in the shortest Path array END ------`
      );
  }

  /**
   * Finding out the minimum entry in the shortest path array
   * This will be used further to update the starting vertex
   */
  findMinimumEntryIndexInShortestPathArray() {
    let minimumDistance = Infinity,
      minimumIndex = 0;
    for (let i = 0; i < this.shortestPaths.length; i++) {
      if (
        !this.vertexList[i].inTree &&
        this.shortestPaths[i].distance < minimumDistance
      ) {
        minimumDistance = this.shortestPaths[i].distance;
        minimumIndex = i;
      }
    }
    return { minimumIndex, minimumDistance }; //@todo can't we return an object
  }
  /**
   * display the shortest path from the currentVertexIndex
   */
  displayShortestPaths() {
    let result = [];
    for (let j = 0; j < this.shortestPaths.length; j++) {
      let temp = this.shortestPaths[j];
      result.push(
        `${temp.distance}(${this.vertexList[
          this.shortestPaths[j].index
        ].getData()})`
      );
    }
    return result;
  }

  static demo() {
    let myGraph = new Graph(5);

    myGraph.addVertex("A");
    myGraph.addVertex("B");
    myGraph.addVertex("C");
    myGraph.addVertex("D");
    myGraph.addVertex("E");

    myGraph.addEdge(0, 1, 50); //AB
    myGraph.addEdge(0, 3, 80); //AD
    myGraph.addEdge(1, 3, 90); //BD
    myGraph.addEdge(1, 2, 60); //BC
    myGraph.addEdge(2, 4, 40); //CE
    myGraph.addEdge(3, 4, 70); //DE
    myGraph.addEdge(4, 1, 50); //EB
    myGraph.addEdge(3, 2, 20); //DC

    console.log("Initial Graph...");
    console.log(myGraph.displayGraph());
    myGraph.searchShortestPaths(false);
  }
}

Graph.demo();
