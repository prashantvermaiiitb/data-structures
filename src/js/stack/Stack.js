/**
 * Stack Implementation
 * To run the prgamm use the command: node ./src/js/stack/Stack.js
 */
class Stack {
  /**
   * constructor for the class
   */
  constructor() {
    this.count = 0;
    this.storage = {};
  }
  /**
   * This will return the Top most element from the stack
   */
  peek() {
    return this.storage[this.count];
  }
  /**
   * this will push the element on the Top of the stack
   * @param {*} element
   */
  push(element) {
    this.storage[++this.count] = element;
  }
  /**
   * This will return the top-most element on the stack.
   */
  pop() {
    return this.storage[this.count--];
  }
  /**
   * This will return the number of elements in the stack
   */
  size() {
    return this.count;
  }
  /**
   * Check whether the stack is empty or not
   */
  isEmpty() {
    return this.count === 0;
  }
  /**
   * Display the entire stack with the count.
   */
  display() {
    console.log("--------------------------------------------------");
    console.log("size of the stack:", this.size());
    console.log("-------------PRINTING STACK-----------------------");
    let i = this.size();
    while (i > 0) {
      console.log(`@Index${i} :--> ${this.storage[i]}`);
      i--;
    }
    console.log("--------------------------------------------------");
  }
  /**
   * flushing the entire stack object at once.
   */
  flush() {
    this.storage = {};
  }
  /**
   * Demo method for the functionality for the Stack.
   */
  static demo() {
    const myStack = new Stack();
    for (let i = 0; i < 10; i++) {
      myStack.push(Math.floor(Math.random() * 1000));
    }
    myStack.display();
    console.log(`Is stack is empty: ${myStack.isEmpty()}`);
    console.log(`Top most element on the stack: ${myStack.peek()}`);
    console.log(`Popping the Top-most element : ${myStack.pop()}`);
    myStack.display();
  }
}

// @todo Un-comment this line to see the Stack in-action
//Stack.demo();

module.exports = Stack;
