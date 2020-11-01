/**
 * Class for checking whether the opening and closing brackets are giving
 * properly or not. like : (a+[b-c]*9+{7+5})
 */
var Stack = require("./Stack");

class BracketMatch {
  /**
   * constructor function
   * @param {*} inputExpression
   */
  constructor(inputExpression) {
    this.inputExpression = inputExpression;
    this.stack = new Stack();
  }
  /**
   * setting the expression input
   * @param {*} inputExpression
   */
  setExpression(inputExpression) {
    this.inputExpression = inputExpression;
    this.stack = new Stack();
  }
  /**
   * Matching the brackets in the input Expression
   */
  matchBrackets() {
    const inputLength = this.inputExpression.length;
    let isExpressionValid = true;
    for (let i = 0; i < inputLength; i++) {
      const char = this.inputExpression.charAt(i);
      switch (char) {
        case "(":
        case "[":
        case "{":
          this.stack.push(char);
          break;
        case "]":
        case ")":
        case "}":
          if (!this.stack.isEmpty()) {
            const tmpChar = this.stack.pop();
            if (
              (tmpChar !== "{" && char == "}") ||
              (tmpChar !== "[" && char == "]") ||
              (tmpChar !== "(" && char == ")")
            ) {
              console.log(
                `\nThere is no matching opening bracket found for ${char} in ${this.inputExpression}.`
              );
              isExpressionValid = false;
            }
          } else {
            console.log(
              `\nThis is extra closing bracket '${char}' present in ${this.inputExpression}.`
            );
            isExpressionValid = false;
          }
          break;
      }
      // break the loop on the first mistake.
      if (!isExpressionValid) {
        break;
      }
    }
    if (isExpressionValid) {
      // There is still possibility that extra brackets being present here.
      if (!this.stack.isEmpty()) {
        console.log(
          `\nThere is/are extra opening brackets are being present in ${this.inputExpression}.`
        );
      } else {
        console.log(`\n${this.inputExpression} : Expression is perfect !!!`);
      }
    }
  }
  /**
   * Function to demo the usage of the program.
   */
  static demo() {
    let bracketMatch = new BracketMatch(`{a+(c+d)-b}`);
    bracketMatch.matchBrackets();
    bracketMatch.setExpression(`{a+9-(c+d-e+[a+b)}`); //un-even closing
    bracketMatch.matchBrackets();
    bracketMatch.setExpression(`{a+9-(c+d-e+[a+b])}}`); //extra closing
    bracketMatch.matchBrackets();
    bracketMatch.setExpression(`{{a+9-(c+d-e+[a+b])}`); //extra opening
    bracketMatch.matchBrackets();
  }
}

BracketMatch.demo();
