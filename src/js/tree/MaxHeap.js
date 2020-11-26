/**
 * creating heap from set of Array
 */

class Node {
  constructor(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  display() {
    console.log(this.data);
  }
}
/**
 * Heap Class Demo for the Max Heap.
 * Here the root node will be greater or equal to it's child node.
 */
class Heap {
  /**
   * constructor
   * @param {*} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize; //maximum number of elements
    this.currentSize = 0; //number of elements currently
    this.heapArray = new Array(maxSize); //heapArray
  }
  /**
   * inserting element in the Heap
   * @param {*} element
   */
  insert(element) {
    if (this.isFull()) {
      return false;
    }
    let dataNode = new Node(element); //form the element
    this.heapArray[this.currentSize] = dataNode; //insert the element at last
    this.trickleUp(this.currentSize++); //passing the current index
    return true;
  }
  /**
   * Element inserted at the end of the array
   * now it will be compared with parent and will be moved up
   * @param {*} index
   */
  trickleUp(index) {
    let bottom = this.heapArray[index],
      parent = Math.floor((index - 1) / 2);
    while (index > 0 && bottom.getData() > this.heapArray[parent].getData()) {
      this.heapArray[index] = this.heapArray[parent];
      index = parent;
      parent = Math.floor((parent - 1) / 2);
    }
    this.heapArray[index] = bottom;
  }

  /**
   * Removing elements from the Heap
   * Then making the remaining tree as the Heap.
   */
  remove() {
    if (this.isEmpty()) {
      return -1;
    }
    let root = this.heapArray[0]; // always remove the Top element
    this.heapArray[0] = this.heapArray[--this.currentSize]; //reduce the current size then get back the element
    this.trickleDown(0);
    return root;
  }
  /**
   * Moving the Elements below after comparing with it's children
   * @param {*} index
   */
  trickleDown(index) {
    let top = this.heapArray[index],
      largerChild;

    //you have to trickle down last level-1
    while (index < Math.floor(this.currentSize / 2)) {
      let leftChild = 2 * index + 1;
      let rightChild = leftChild + 1;
      //which of the child is big replace that with parent
      if (
        rightChild < this.currentSize &&
        this.heapArray[rightChild].getData() >
          this.heapArray[leftChild].getData()
      ) {
        largerChild = rightChild;
      } else {
        largerChild = leftChild;
      }
      //what if parent is larger or equal already
      if (top.getData() >= this.heapArray[largerChild].getData()) {
        break;
      }
      //assign the proper values
      this.heapArray[index] = this.heapArray[largerChild];
      //update the child position for next match
      index = largerChild;
    }
    this.heapArray[index] = top; //copy the element at the last
  }

  /**
   * Checking whether there are no elements in the array
   */
  isEmpty() {
    return this.currentSize === 0;
  }
  /**
   * Number of elements in the array is equal to the (maxSize-1)
   */
  isFull() {
    return this.currentSize === this.maxSize;
  }

  display() {
    console.log(this.heapArray);
  }

  /**
   * Demo the functionality for the code.
   */
  static demo() {
    let myMaxHeap = new Heap(10);
    for (let i = 0; i < 10; i++) {
      let num = Math.round(Math.random() * 100);
      //   console.log(`Number to be inserted..`, num);
      myMaxHeap.insert(num);
    }
    myMaxHeap.display();
    console.log("Element present on the top of the heap..", myMaxHeap.remove());
    myMaxHeap.display();
  }
}

Heap.demo();
