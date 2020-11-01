var StringReverse = require("./StringReverse");
/**
 * Checking whether the string is palindrome or not using the stack
 */
class StringPalindrome {
  /**
   * constructor for the class
   * @param {*} input
   */
  constructor(input) {
    this.input = input;
    this.stringReverse = new StringReverse(input);
  }
  /**
   * Setting the new input for the class
   * @param {*} input
   */
  setInput(input) {
    this.input = input;
    this.stringReverse = new StringReverse(input);
  }
  /**
   * Checking whether string is palindrome or not
   */
  isStringPalindrome() {
    if (!this.input) {
      throw new Error("Please provide relevant input string!!");
    }
    let reversedString = this.stringReverse.reverse();
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
    myStringPalindomeChecker.setInput("racecar");
    myStringPalindomeChecker.isStringPalindrome();
  }
}

StringPalindrome.demo();
