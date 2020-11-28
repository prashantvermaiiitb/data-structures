var depthFirstSearch = require("./DepthFirstSearch");
var breadthFirstSearch = require("./BreadthFirstSearch");
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
   */
  addEdge(from, to) {
    this.adjacentMatrix[from][to] = 1;
    this.adjacentMatrix[to][from] = 1;
  }
  /**
   * display the vertex
   * @param {*} index
   */
  displayVertex(index) {
    console.log(this.vertexList[index].display());
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

    console.log(myGraph);

    console.log("Doing Depth First search....");
    depthFirstSearch.search(myGraph); //created and exported Object

    console.log("Doing Breadth First search....");
    breadthFirstSearch(myGraph); //created function and exported it
  }
}

Graph.demo();
