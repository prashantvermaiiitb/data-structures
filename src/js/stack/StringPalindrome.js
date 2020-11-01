/**
 * Checking whether the string is palindrome or not using the stack
 */
var Stack = require("./Stack");

class StringPalindrome {
  /**
   * constructor for the class
   * @param {*} input
   */
  constructor(input) {
    this.input = input;
    this.Stack = new Stack();
  }
  /**
   * Setting the new input for the class
   * @param {*} input
   */
  setInput(input) {
    this.input = input;
    this.Stack.flush();
  }
  /**
   * Checking whether string is palindrome or not
   */
  isStringPalindrome() {
    if (!this.input) {
      throw new Error("Please provide relevant input string!!");
    }
    let inputLength = this.input.length;
    for (let i = 0; i < inputLength; i++) {
      this.Stack.push(this.input.charAt(i));
    }
    this.Stack.display();
    let reversedString = "";
    while (!this.Stack.isEmpty()) {
      reversedString += this.Stack.pop();
    }
    console.log(`Reversed String`, reversedString);
    if (this.input == reversedString) {
      console.log(`'${this.input}' is a palindrome`);
    } else {
      console.log(`'${this.input}' is not a palindrome of '${reversedString}'`);
    }
  }
  /**
   * Demo the functionality of the class
   */
  static demo() {
    let myStringPalindomeChecker = new StringPalindrome("prashant");
    myStringPalindomeChecker.isStringPalindrome();
    myStringPalindomeChecker.setInput('racecar');
    myStringPalindomeChecker.isStringPalindrome();
  }
}

StringPalindrome.demo();
