/**
 * Circular queue with number of elements
 */
class CircularQueue {
  /**
   * constructor function for the Queue
   * @param {*} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize; //maximum number of items in the queue
    this.array = new Array(maxSize).fill(0); //initialized
    this.front = 0; //front of the queue -- index
    this.rear = -1; // rear of the queue -- index
    this.items = 0; // number of items in the queue -- count
  }
  /**
   * putting elements in the circular queue
   * @param {*} element
   */
  enqueue(element) {
    let flag = true;
    if (!this.isFull()) {
      if (this.rear == this.maxSize - 1) {
        //rear is at the end but queue is not full
        this.rear = -1;
      }
      this.array[++this.rear] = element;
      this.items++;
    } else {
      flag = false;
    }
    return flag;
  }
  /**
   * Removing elements from the Queue∂
   * @param {]} element
   */
  dequeue() {
    let temp = -1;
    if (!this.isEmpty()) {
      if (this.front == this.maxSize - 1) {
        //if the front is already on the Top limit but still there are slots
        this.front = 0;
      }
      temp = this.array[this.front]; // get the element before deleting it
      this.array[this.front] = -1; //making the entries invalid as we delete them.
      this.front++;
      this.items--;
    }
    return temp;
  }
  /**
   * Checking queue is full or not
   */
  isFull() {
    return this.items == this.maxSize; //this.rear == this.maxSize - 1; //this.items === this.maxSize;
  }
  /**
   * If queue is empty
   */
  isEmpty() {
    return this.items === 0;
  }
  peek() {}
  /**
   * Display the queue
   */
  display() {
    console.log("-----------------------");
    console.log(`front is @ ${this.front} and rear is @ ${this.rear}`);
    console.log(
      `Max elements (${this.maxSize}) and Present elements in Queue (${this.items})`
    );
    let result = "front-->";

    // when front and rear both are on the same side of the array below maxLength
    if (this.rear < this.maxSize && this.front <= this.rear) {
      for (let i = this.front; i <= this.rear; i++) {
        result += `${this.array[i]}-->`;
      }
    } else {
      // when front is within limits while rear has crossed the boundary
      for (let i = this.front; i < this.maxSize; i++) {
        result += `${this.array[i]}-->`;
      }
      //traverse till rear as well
      for (let i = 0; i <= this.rear; i++) {
        result += `${this.array[i]}-->`;
      }
    }
    result += "rear";
    console.log(`Queue is :${result}`);
    console.log("-----------------------");
  }
  /**
   * Method to show the functionality for the class
   */
  static demo() {
    let myCircularQueue = new CircularQueue(10);
    for (let i = 0; i < 10; i++) {
      myCircularQueue.enqueue(Math.floor(Math.random() * 1000));
    }
    myCircularQueue.display();
    console.log(`element deleted from Queue: ${myCircularQueue.dequeue()}`); //deleting first a[0], f = 1 r = 9
    console.log(`element deleted from Queue: ${myCircularQueue.dequeue()}`); //deleting first a[1], f = 2 r = 9
    console.log(`element deleted from Queue: ${myCircularQueue.dequeue()}`); //deleting first a[1], f = 3 r = 9
    console.log(`element deleted from Queue: ${myCircularQueue.dequeue()}`); //deleting first a[1], f = 4 r = 9
    console.log(`element deleted from Queue: ${myCircularQueue.dequeue()}`); //deleting first a[1], f = 5 r = 9
    console.log(`element deleted from Queue: ${myCircularQueue.dequeue()}`); //deleting first a[1], f = 6 r = 9
    myCircularQueue.display();

    myCircularQueue.enqueue(1); // inserting element f= 6 r = 0
    myCircularQueue.enqueue(2); // inserting element f= 6 r = 1
    myCircularQueue.enqueue(3); // inserting element f= 6 r = 2
    myCircularQueue.enqueue(4); // inserting element f= 6 r = 3
    myCircularQueue.enqueue(5); // inserting element f= 6 r = 4
    myCircularQueue.enqueue(6); // inserting element f= 6 r = 5
    myCircularQueue.display();

    let isElementAdded = myCircularQueue.enqueue(37);
    console.log(`Is (37) Element Added : ${isElementAdded}`);
    isElementAdded = myCircularQueue.enqueue(38);
    console.log(`Is (38) Element Added : ${isElementAdded}`);
    isElementAdded = myCircularQueue.enqueue(39);
    console.log(`Is (39) Element Added : ${isElementAdded}`);
    myCircularQueue.display();
  }
}

CircularQueue.demo();
