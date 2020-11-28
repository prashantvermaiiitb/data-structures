var depthFirstSearch = require("./DepthFirstSearch");
var breadthFirstSearch = require("./BreadthFirstSearch");
var minimumSpanningTree = require("./MinimumSpanningTree");
var topologicalSort = require("./TopologicalSorting");
/**
 * Sample class for the Graph implementation.
 */
class Vertex {
  /**
   * constructor
   * @param {*} data
   */
  constructor(data) {
    this.data = data;
    this.visited = false;
  }
  /**
   * flag for the visited or not
   * @param {*} visited
   */
  setVisited(visited) {
    this.visited = visited;
  }
  /**
   * display the vertex
   */
  display() {
    console.log(`${this.data} is visited : ${this.visited} now !!`);
  }
  /**
   * returning the data for the node
   */
  getData() {
    return this.data;
  }
}

class Graph {
  /**
   * constructor function
   * @param {*} maxVertices
   */
  constructor(maxVertices) {
    this.maxVertices = maxVertices; //max number of vertices
    this.vertexList = new Array(maxVertices); //to hold the vertices
    this.adjacentMatrix = new Array(); //to show the connections
    this.currentVertices = 0; //current number of vertices
    for (let i = 0; i < maxVertices; i++) {
      this.adjacentMatrix.push(new Array(maxVertices).fill(0)); //have an Array at each index with number of elements equal to maxVertices
    }
  }
  /**
   * checking number of vertices supported
   */
  isFull() {
    return this.currentVertices === this.maxVertices;
  }
  /**
   * checking current number of vertices
   */
  isEmpty() {
    return this.currentVertices === 0;
  }
  /**
   * Adding the vertex to the Graph
   * @param {*} data
   */
  addVertex(data) {
    if (this.isFull()) {
      console.log(`Graph is already full..`);
      return -1;
    }
    this.vertexList[this.currentVertices++] = new Vertex(data);
  }
  /**
   * Adding the edge in the graph
   * @param {*} from
   * @param {*} to
   * @param {boolean} isDag : represents whether the graph is Directed Acyclic graph
   */
  addEdge(from, to, isDAG = false) {
    this.adjacentMatrix[from][to] = 1;
    !isDAG && (this.adjacentMatrix[to][from] = 1);
  }
  /**
   * display the vertex
   * @param {*} index
   */
  displayVertex(index) {
    console.log(this.vertexList[index].display());
  }
  /**
   * Display an edge
   * @param {*} from
   * @param {*} to
   */
  displayEdge(from, to) {
    console.log(
      `${this.vertexList[from].getData()}${this.vertexList[to].getData()}`
    );
  }

  /**
   * getting the un-visited for the vertex being passed
   * @param {*} index
   */
  getUnvisitedVertex(index) {
    // console.log(
    //   `unvisited vertex to be searched for ...${index} & it's visited and ${this.vertexList[index].visited}`
    // );
    for (let j = 0; j < this.currentVertices; j++) {
      // console.log(
      //   `@index(${index + "," + j}) is ${
      //     this.adjacentMatrix[index][j]
      //   }  and condition-1 is ${
      //     this.adjacentMatrix[index][j] === 1
      //   } and condition-2 is ${this.vertexList[j].visited}`
      // );
      if (this.adjacentMatrix[index][j] === 1 && !this.vertexList[j].visited) {
        return j;
      }
    }
    return -1;
  }

  /**
   * un-marking all the vertices as un-visited
   */
  unMarkAllVertexAsUnvisited() {
    for (let i = 0; i < this.currentVertices; i++) {
      this.vertexList[i].setVisited(false);
    }
  }
  /**
   * returning vertexList
   */
  getVertexList() {
    return this.vertexList;
  }
  /**
   * returning the number of current vertices
   */
  getCurrentVertices() {
    return this.currentVertices;
  }

  /**
   * searching the graph to get the node with no starting edge
   * this node will have all the nodes ending to it.
   */
  findANodeWithNoSuccessor() {
    let hasEdge = false;
    for (let row = 0; row < this.currentVertices; row++) {
      hasEdge = false;
      for (let col = 0; col < this.currentVertices; col++) {
        if (this.adjacentMatrix[row][col] > 0) {
          hasEdge = true; //this has the edge start
          break;
        }
      }
      if (!hasEdge) {
        return row;
      }
    }
    return -1;
  }
  /**
   * Deleting the vertex from the graph
   * This will need to update
   * - vertexList
   * - adjacency matrix
   * @param {*} index
   */
  deleteVertex(index, debug = false) {
    debug &&
      console.log(
        "deleteVertex condition :",
        index !== this.currentVertices - 1,
        "with index ",
        index,
        "with currentVertices-1 ",
        this.currentVertices - 1
      );
    //if not deleting the last node
    if (index !== this.currentVertices - 1) {
      //removing the vertex from the vertexList
      //considering 1 less index because we are copying next one to the current one.
      for (let i = index; i < this.currentVertices - 1; i++) {
        debug &&
          console.log(`vertex that will be deleted `, this.vertexList[index]);
        this.vertexList[i] = this.vertexList[i + 1];
      }
      debug &&
        console.log(
          this.vertexList
            .filter((value, index) => index < this.currentVertices)
            .map((vertex) => vertex.getData())
            .join(" ")
        );

      //moving the row up
      for (let i = index; i < this.currentVertices - 1; i++) {
        this.moveRowUp(i, this.currentVertices);
      }
      debug &&
        console.log(
          "Moving the row-up and display the graph:",
          this.displayGraph()
        );

      //moving the column left
      for (let i = index; i < this.currentVertices - 1; i++) {
        this.moveColumnLeft(i, this.currentVertices - 1);
      }
      debug &&
        console.log(
          "Moving the column left and display the graph:",
          this.displayGraph()
        );
    }
    this.currentVertices--;
  }

  /**
   * Handling 2 rows at a time and copying 1 in another
   * @param {*} rowIndex
   * @param {*} columnCount
   */
  moveRowUp(rowIndex, columnCount) {
    for (let col = 0; col < columnCount; col++) {
      this.adjacentMatrix[rowIndex][col] = this.adjacentMatrix[rowIndex + 1][
        col
      ];
    }
  }
  /**
   * Moving the columns from right to left
   * @param {*} colIndex
   * @param {*} rowCount
   */
  moveColumnLeft(colIndex, rowCount) {
    for (let row = 0; row < rowCount; row++) {
      this.adjacentMatrix[row][colIndex] = this.adjacentMatrix[row][
        colIndex + 1
      ];
    }
  }

  /**
   * Display the adjacency matrix in the graph
   */
  displayGraph() {
    let graph = [];
    graph.push(
      "  " +
        this.vertexList
          .filter((value, index) => index < this.currentVertices)
          .map((vertex) => {
            return vertex.getData();
          })
          .join(" ")
    );

    for (let i = 0; i < this.currentVertices; i++) {
      graph.push(
        this.vertexList[i].getData() +
          " " +
          this.adjacentMatrix[i]
            .filter((value, index) => index < this.currentVertices)
            .join(" ")
      );
    }
    return graph;
  }

  /**
   * Demo the functionality for the Depth first search
   */
  static demo() {
    let myGraph = new Graph(5);
    //adding nodes in the Graph
    myGraph.addVertex("A"); //0
    myGraph.addVertex("B"); //1
    myGraph.addVertex("C"); //2
    myGraph.addVertex("D"); //3
    myGraph.addVertex("E"); //4

    //adding edges in the Graph
    myGraph.addEdge(0, 1); //AB
    myGraph.addEdge(1, 2); //BC
    myGraph.addEdge(0, 3); //AD
    myGraph.addEdge(3, 4); //DE

    console.log(myGraph.displayGraph());

    console.log("Doing Depth First search....");
    depthFirstSearch.search(myGraph); //created and exported Object

    console.log("Doing Breadth First search....");
    breadthFirstSearch(myGraph); //created function and exported it

    console.log("generating the Minimum spanning tree");
    minimumSpanningTree.getMSTFromDepthFirstSearch(myGraph);

    myGraph.unMarkAllVertexAsUnvisited(); //un-marking so that next operation could be performed on the graph

    minimumSpanningTree.getMSTFromBreadthFirstSearch(myGraph);

    myGraph = new Graph(8);
    myGraph.addVertex("A"); //0
    myGraph.addVertex("B"); //1
    myGraph.addVertex("C"); //2
    myGraph.addVertex("D"); //3
    myGraph.addVertex("E"); //4
    myGraph.addVertex("F"); //5
    myGraph.addVertex("G"); //6
    myGraph.addVertex("H"); //7

    myGraph.addEdge(0, 3, true); //AD
    myGraph.addEdge(0, 4, true); //AE
    myGraph.addEdge(1, 4, true); //BE
    myGraph.addEdge(2, 5, true); //CF
    myGraph.addEdge(3, 6, true); //DG
    myGraph.addEdge(4, 6, true); //EG
    myGraph.addEdge(5, 7, true); //FH
    myGraph.addEdge(6, 7, true); //GH

    console.log(`Graph as below :-`);
    console.log(myGraph.displayGraph());
    console.log("Performing topological sorting");
    console.log(topologicalSort(myGraph).join(" "));
  }
}

Graph.demo();
