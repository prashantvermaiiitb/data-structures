/**
 * Circular queue without the number of items being used
 * for the traversal.
 */
class CircularQueue {
  /**
   * Constructor function for the Circular Queue
   * @param {*} maxSize
   */
  constructor(maxSize) {
    this.front = 0;
    this.rear = -1;
    this.maxSize = maxSize + 1; //+1 to the size passed in the constructor
    this.array = new Array(this.maxSize); // overall +2 elements are there in the array
  }
  /**
   * Checking whether Queue is empty
   * 2-conditions has to be checked contiguous or broken sequence
   * contiguous -> f = 0 / rear = -1 => front = rear + 1 | both are on same side
   * broken -> f = mid / rear = crossed the boundary => rear = front + maxsize-÷1 | different sides
   */
  isEmpty() {
    return (
      this.front == this.rear + 1 || this.rear == this.front + this.maxSize - 1
    );
  }
  /**
   * checking whether the queue is full or not
   * contiguous sequence : f = 0 | rear = maxsize -1 => rear = front + maxsize -2
   * broken sequence : f = mid | rear +2 => front = rear +2
   */
  isFull() {
    return (
      this.front + this.maxSize - 2 == this.rear || this.front == this.rear + 2
    );
  }
  /**
   * Generating the number of items in the queue.
   */
  size() {
    if (this.rear >= this.front) {
      //contiguous
      return this.rear - this.front + 1;
    } else {
      return this.maxSize - this.front + (this.rear + 1);
    }
  }
  /**
   * Putting elements in the queue
   * @param {*} element
   */
  enqueue(element) {
    let flag = true;
    if (!this.isFull()) {
      if (this.rear == this.maxSize - 1) {
        this.rear = -1;
      }
      this.array[++this.rear] = element;
      flag = true;
    }
    return flag;
  }
  /**
   * removing element from the queue
   */
  dequeue() {
    let temp = -1;
    if (!this.isEmpty()) {
      temp = this.array[this.front++]; //incrementing the front
      if (this.front === this.maxSize) {
        //handling if front has reached the maxsize
        this.front = 0;
      }
    }
    return temp;
  }
  /**
   * returning element on the front of the queue
   */
  peek() {
    return this.array[this.front];
  }
  /**
   * Display the queue
   */
  display() {
    console.log("-----------------------");
    console.log(`front is @ ${this.front} and rear is @ ${this.rear}`);
    console.log(`Max elements (${this.maxSize}) and Size of Queue ${this.size()}`);
    let result = "";

    /**
     * contiguous sequence
     * f = 0 ; re = mid
     * f = mid ; rear - back
     *
     * broken sequence
     * rear + maxsize -2 > front
     */
    //All the elements are deleted as well but this should be handled in the isEmpty() in the start of this method
    if (this.isEmpty()) {
      console.log(`There are no elements in the Queue to display.`);
      result += `rear --> front`;
    } else {
      if (this.front < this.rear) {
        result = "front-->";
        for (let i = this.front; i <= this.rear; i++) {
          result += `${this.array[i]}-->`;
        }
        result += "rear";
      } else if (this.front > this.rear) {
        //rear have crossed the boundary
        result = "front-->";
        // when front is within limits while rear has crossed the boundary
        for (let i = this.front; i < this.maxSize; i++) {
          result += `${this.array[i]}-->`;
        }
        //traverse till rear as well
        for (let i = 0; i <= this.rear; i++) {
          result += `${this.array[i]}-->`;
        }
        result += "rear";
      } else {
        //there is only 1 element in the array;
        console.log(`what has to be done here ???? `);
      }
    }
    console.log(`Queue is :${result}`);
    console.log("-----------------------");
  }
  /**
   * method for showing the operations that can be done
   * using the circular queue.
   */
  static demo() {
    let myCircularQ = new CircularQueue(10);
    myCircularQ.enqueue(1);
    myCircularQ.enqueue(2);
    myCircularQ.enqueue(3);
    myCircularQ.enqueue(4);
    myCircularQ.enqueue(5);
    myCircularQ.enqueue(6);
    myCircularQ.enqueue(7);
    myCircularQ.enqueue(8);
    myCircularQ.display();
    while (!myCircularQ.isEmpty()) {
      console.log(
        `Removed : ${myCircularQ.dequeue()} with front :(${
          myCircularQ.front
        }) & rear: (${myCircularQ.rear})`
      );
    }
    myCircularQ.display();
    myCircularQ.enqueue(21);
    myCircularQ.enqueue(31);
    myCircularQ.enqueue(41);
    myCircularQ.display();
    myCircularQ.enqueue(51);
    myCircularQ.enqueue(61);
    myCircularQ.enqueue(71);
    myCircularQ.display();
    console.log(`Elements at the front of the Queue : ${myCircularQ.peek()}`)
  }
}

CircularQueue.demo();
