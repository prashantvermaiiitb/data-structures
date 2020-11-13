/**
 * Simple Queue class
 */
class Queue {
  /**
   * constructor
   * @param {*} size
   */
  constructor(size) {
    this.maxSize = size;
    this.array = new Array(this.maxSize).fill(0);
    this.front = 0;
    this.rear = -1;
    this.items = 0;
  }
  /**
   * Adding element in the Queue
   * @param {*} element
   */
  enqueue(element) {
    let isElementAdded = false;
    if (!this.isFull()) {
      this.array[++this.rear] = element;
      this.items++;
      isElementAdded = true;
    }
    return isElementAdded;
  }
  /**
   * Returning element at the Front
   */
  peek() {
    return this.array[this.front];
  }
  /**
   * Removing element from the Queue
   */
  dequeue() {
    if (!this.isEmpty()) {
      this.items--;
      return this.array[this.front++];
    }
    return -1;
  }
  /**
   * Checking whether Queue is full or not
   */
  isFull() {
    return this.items == this.maxSize - 1; //this.rear == this.maxSize - 1 && this.front == 0;
  }
  /**
   * Checking whether Queue is empty
   */
  isEmpty() {
    return this.items === 0; //this.front == 0 && this.rear == -1;
  }
  display() {
    console.log("-----------------------");
    console.log(`front is @ ${this.front}`);
    console.log(`rear is @ ${this.rear}`);
    console.log(`Number of elements in the Queue : ${this.items}`);
    let result = "front-->";
    for (let i = this.front; i <= this.rear; i++) {
      result += `${this.array[i]}-->`;
    }
    result += "rear";
    console.log(`Queue is :${result   }`);
    console.log("-----------------------");
  }
  /**
   * demo to show the functionality
   */
  static demo() {
    let myQueue = new Queue(10);
    for (let i = 0; i < 10; i++) {
      let a = myQueue.enqueue(Math.floor(Math.random() * 1000));
    }
    myQueue.display();
    console.log(`Queue peek : ${myQueue.peek()}`);
    const ele = myQueue.dequeue();
    console.log(`Element at the front : ${ele}`);
    myQueue.display();
    console.log(`is element added : ${myQueue.enqueue(ele)}`);
    myQueue.display();
    console.log(`is element added : ${myQueue.enqueue(ele)}`);
    myQueue.display();
  }
}

Queue.demo();
