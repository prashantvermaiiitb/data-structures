/**
 * this is the queue formation using the array[] and it's method present in javascript.
 */
class SimpleQueue {
  /**
   * constructor function
   */
  constructor() {
    this.collection = [];
  }
  /**
   * put the element in the queue
   * @param {*} element
   */
  enQueue(element) {
    this.collection.push(element);
  }
  /**
   * remove the front element from the queue
   */
  deQueue() {
    return this.collection.shift();
  }
  /**
   * return the front of the queue
   */
  front() {
    return this.collection[0];
  }
  /**
   * return size of the array
   */
  size() {
    return this.collection.length;
  }
  /**
   * Size of the queue of 0
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * Display the queue
   */
  display() {
    console.log(this.collection);
  }
  /**
   * Demo functionality
   */
  static demo() {
    let simpleQueue = new SimpleQueue();
    simpleQueue.enQueue(1);
    simpleQueue.enQueue(2);
    simpleQueue.enQueue(3);
    simpleQueue.enQueue(4);
    simpleQueue.enQueue(5);
    simpleQueue.display();
    console.log(simpleQueue.front());
    console.log(simpleQueue.size());
    console.log(simpleQueue.deQueue());
    simpleQueue.display();
    simpleQueue.enQueue(51);
  }
}
// SimpleQueue.demo();

module.exports = new SimpleQueue();
