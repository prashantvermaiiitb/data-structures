/**
 * PQ example where we have to send {object, priority} in the data-structure.
 * Before the element is being added in the Queue it's priority is being checked.
 */
class SimplePriorityQueue {
  /**
   * constructor
   */
  constructor() {
    this.collection = [];
  }
  /**
   * Putting the elements in the queue
   * @param {*} element
   */
  enQueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let len = this.collection.length;
      let isAddedToQueue = false;
      for (let i = 0; i < len; i++) {
        if (element.priority < this.collection[i].priority) {
          this.collection.splice(i, 0, element);
          isAddedToQueue = true;
          break;
        }
      }
      if (!isAddedToQueue) {
        this.collection.push(element);
      }
    }
  }
  /**
   * Remove the elements from the queue
   */
  deQueue() {
    return this.collection.shift();
  }
  /**
   * Getting elements from the front
   */
  front() {
    return this.collection[0];
  }
  /**
   * Getting size of the collection
   */
  size() {
    return this.collection.length;
  }
  /**
   * Checking whether queue isempty
   */
  isEmpty() {
    return this.collection.length === 0;
  }
  /**
   * Displaying the queue
   */
  display() {
    console.log("Displaying the queue..", ...this.collection);
  }
  /**
   * Demo the functionality
   */
  static demo() {
    let mySimplePq = new SimplePriorityQueue();
    mySimplePq.enQueue({ key: "hello", priority: 5 });
    mySimplePq.enQueue({ key: "bhai", priority: 3 });
    mySimplePq.enQueue({ key: "bye", priority: 1 });
    mySimplePq.enQueue({ key: "keith", priority: 2 });
    mySimplePq.display();
  }
}

SimplePriorityQueue.demo();

module.exports = SimplePriorityQueue;
