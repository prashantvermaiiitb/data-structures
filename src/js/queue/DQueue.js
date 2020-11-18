/**
 * DeQueue
 * You can insert in the Queue from either end
 * insertLeft or insertRight
 * RemoveLeft or RemoveRight
 */
class DeQueue {
  /**
   * constructor for the Queue
   * @param {*} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.array = new Array(this.maxSize).fill(0);
    this.items = 0;
    this.frontLeft = 0; //leftmost index
    this.rearLeft = -1; //leftmost boundary out
    this.frontRight = this.maxSize - 1; //rightmost index
    this.rearRight = this.maxSize; //rightmost index but out of the boundary
  }
  /**
   * check whether the Q is full
   */
  isFull() {
    return this.items == this.maxSize;
  }
  /**
   * check whether queue is empty
   */
  isEmpty() {
    return this.items === 0;
  }
  /**
   * inserting the number of element from the left
   * @param {*} element
   */
  insertLeft(element) {
    if (!this.isFull()) {
      this.array[++this.rearLeft] = element;
      this.items++;
    } else {
      console.log(`Q is full no space to insert -> ${element} from left.`);
    }
  }
  /**
   * Inserting elements from the right end of the array
   * @param {*} element
   */
  insertRight(element) {
    if (!this.isFull()) {
      this.items++;
      this.array[--this.rearRight] = element;
    } else {
      console.log(
        `Q is full there is no space to insert -> ${element} from right.`
      );
    }
  }
  /**
   * Deleting element from the left
   */
  deleteLeft() {
    if (!this.isEmpty()) {
      this.items--;
      return this.array[this.frontLeft++];
    }
    console.log(`Q is empty there is nothing to delete..`);
  }
  /**
   * Deleting the element from the right index
   */
  deleteRight() {
    if (!this.isEmpty()) {
      this.items--;
      return this.array[this.frontRight--];
    }
    console.log(`Q is empty there is nothing to delete..`);
  }
  /**
   * Checking the element from the left
   */
  peekLeft() {
    return this.array[this.frontLeft];
  }
  /**
   * checking the element from the right
   */
  peekRight() {
    return this.array[this.frontRight];
  }
  /**
   * display the array
   */
  display(fromLeft = true) {
    console.log("------------------------------------------------");
    if (fromLeft) {
      console.log(
        `frontLeft is @ ${this.frontLeft} and rearLeft is @ ${this.rearLeft}`
      );
    } else {
      console.log(
        `frontRight is @ ${this.frontRight} and rearRight is @ ${this.rearRight}`
      );
    }
    console.log(this.array);
    console.log("------------------------------------------------");
  }
  /**
   * Putting the size of the Q
   */
  size() {
    console.log(`Number of the elements in the Array .. ${this.items}`);
  }
  /**
   * re-setting the limits of the Q
   */
  reset() {
    this.array = new Array(this.maxSize).fill(0);
    this.frontLeft = 0;
    this.rearLeft = -1;
    this.frontRight = this.maxSize - 1;
    this.rearRight = this.maxSize;
  }
  /**
   * showing the functionality of the class
   */
  static demo() {
    let size = 10;
    let dQueue = new DeQueue(size);
    for (let i = 0; i < size; i++) {
      dQueue.insertLeft(i);
    }
    dQueue.insertLeft(11);
    dQueue.display();
    while (!dQueue.isEmpty()) {
      console.log(`element deleted now from left.. ${dQueue.deleteLeft()}`);
    }
    dQueue.size();
    for (let i = 0; i < size; i++) {
      dQueue.insertRight(i);
    }
    dQueue.display(false);
    while (!dQueue.isEmpty()) {
      console.log(`element deleted now from right.. ${dQueue.deleteRight()}`);
    }
    dQueue.size();

    //Running stack
    dQueue.reset();
    dQueue.insertLeft(1);
    dQueue.insertLeft(2);
    dQueue.insertLeft(3);
    dQueue.insertLeft(4);
    dQueue.display();
    while (!dQueue.isEmpty()) {
      console.log(`element deleted now from right.. ${dQueue.deleteRight()}`);
    }
  }
}
DeQueue.demo();
