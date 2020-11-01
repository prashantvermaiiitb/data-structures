var Stack = require("./Stack");
/**
 * Class for doing the reversal of the string using stack
 * Use this command to run the Program : node ./src/js/stack/StringReverse.js
 */
class StringReverse {
  /**
   * constructor function
   * @param {*} input
   */
  constructor(input) {
    this.input = input;
    this.stack = new Stack();
  }
  /**
   * Reversing the provided string input
   */
  reverse() {
    if (!this.input) {
      throw new Error("Please provide the relevant input.");
    }
    for (let i = 0; i < this.input.length; i++) {
      this.stack.push(this.input.charAt(i));
    }
    this.stack.display();
    let reversedInput = "";
    while (!this.stack.isEmpty()) {
      reversedInput += this.stack.pop();
    }
    return reversedInput;
  }
  /**
   * Method for showing the functionality of the class
   */
  static demo() {
    let myStringReverse = new StringReverse("prashant");
    console.log(`Reversed string is :`, myStringReverse.reverse());
  }
}

// @todo Un-comment this line to run this program
// StringReverse.demo();

module.exports = StringReverse;
