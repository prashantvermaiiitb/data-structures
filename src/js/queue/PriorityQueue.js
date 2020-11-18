/**
 * Priority Queue : Using array
 * Element with the smallest value will be at the front
 */
class PriorityQ {
  /**
   * constructor function for the page.
   * @param {*} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.array = new Array(maxSize).fill(0);
    this.items = 0;
  }
  /**
   * Putting the element in the queue
   * @param {*} element
   */
  enQueue(element) {
    if (!this.isFull()) {
      if (this.items === 0) {
        this.array[this.items++] = element;
      } else {
        let i; //= this.items - 1;
        for (i = this.items - 1; i >= 0; i--) {
          if (element > this.array[i]) {
            this.array[i + 1] = this.array[i];
          } else {
            break;
          }
        }
        this.array[i + 1] = element;
        this.items++;
      }
    } else {
      console.log(`PQ is full no space.`);
    }
  }
  /**
   * removing the last element always because this is a priority queue
   */
  deQueue() {
    return this.array[--this.items];
  }
  /**
   * letting you know the minimum element in the PQ without deleting it
   */
  peekMin() {
    return this.array[this.items - 1];
  }
  /**
   * checking whether the array is full or not
   */
  isFull() {
    return this.items === this.maxSize;
  }
  /**
   * Checking if the queue is empty or not.
   */
  isEmpty() {
    return this.items === 0;
  }
  /**
   * Display the PQ so far
   */
  display() {
    console.log(this.array);
  }
  /**
   * static function to show the functionality of the
   * priority queue
   */
  static demo() {
    let myPriorityQ = new PriorityQ(10);
    myPriorityQ.enQueue(90);
    myPriorityQ.enQueue(900);
    myPriorityQ.enQueue(9000);
    myPriorityQ.enQueue(90000);
    myPriorityQ.enQueue(9);
    myPriorityQ.enQueue(900000);
    myPriorityQ.display();
    while (!myPriorityQ.isEmpty()) {
      console.log(`element removed from the PQ : `, myPriorityQ.deQueue());
    }
    myPriorityQ.enQueue(-98);
    myPriorityQ.enQueue(45);
    myPriorityQ.enQueue(23);
    myPriorityQ.enQueue(-75);
    myPriorityQ.enQueue(-94);
    myPriorityQ.enQueue(200);
    myPriorityQ.enQueue(84);
    myPriorityQ.enQueue(500);
    myPriorityQ.enQueue(-789);
    myPriorityQ.display();
    myPriorityQ.enQueue(700);
    myPriorityQ.enQueue(89);
    myPriorityQ.enQueue(189);
    myPriorityQ.enQueue(89);
    myPriorityQ.display();
  }
}
PriorityQ.demo();
