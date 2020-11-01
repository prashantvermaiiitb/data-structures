/**
 * Class for checking whether the opening and closing brackets are giving
 * properly or not. like : (a+[b-c]*9+{7+5})
 */
var Stack = require("./Stack");

// Error codes
const ErrorConstant = {
  NO_MATCHING_OPENING_BRACKETS: (char, inputExpression) => {
    return `\nThere is no matching opening bracket found for ${char} in ${inputExpression}.`;
  },
  EXTRA_CLOSING_BRACKETS: (char, inputExpression) => {
    return `\nThis is extra closing bracket '${char}' present in ${inputExpression}.`;
  },
  EXTRA_OPENING_BRACKETS: (inputExpression) => {
    return `\nThere is/are? extra opening brackets are being present in ${inputExpression}.`;
  },
};

class BracketMatch {
  /**
   * constructor function
   * @param {*} inputExpression
   */
  constructor(inputExpression) {
    this.inputExpression = inputExpression;
    this.stack = new Stack();
    this.isExpressionValid = true;
    this.errorCode;
  }
  /**
   * setting the expression input
   * @param {*} inputExpression
   */
  setExpression(inputExpression) {
    this.inputExpression = inputExpression;
    this.stack = new Stack();
    this.isExpressionValid = true;
    this.errorCode = null;
  }
  /**
   * Matching the brackets in the input Expression
   */
  matchBrackets() {
    const inputLength = this.inputExpression.length;
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
              this.isExpressionValid = false;
              this.errorCode = ErrorConstant.NO_MATCHING_OPENING_BRACKETS(
                char,
                this.inputExpression
              );
            }
          } else {
            this.isExpressionValid = false;
            this.errorCode = ErrorConstant.EXTRA_CLOSING_BRACKETS(
              char,
              this.inputExpression
            );
          }
          break;
      }
      // break the loop on the first mistake.
      if (!this.isExpressionValid) {
        break;
      }
    }
    if (this.isExpressionValid) {
      // There is still possibility that extra brackets being present here.
      if (!this.stack.isEmpty()) {
        this.isExpressionValid = false;
        this.errorCode = ErrorConstant.EXTRA_OPENING_BRACKETS(
          this.inputExpression
        );
      }
    }
  }
  /**
   * Showing the result of the comparsion for the inputExpression
   */
  displayResult() {
    if (this.isExpressionValid) {
      console.log(`\n${this.inputExpression} : Expression is perfect !!!`);
    } else {
      console.log(this.errorCode);
    }
  }

  /**
   * Function to demo the usage of the program.
   */
  static demo() {
    let bracketMatch = new BracketMatch(`{a+(c+d)-b}`);
    bracketMatch.matchBrackets();
    bracketMatch.displayResult();

    bracketMatch.setExpression(`{a+9-(c+d-e+[a+b)}`); //un-even closing
    bracketMatch.matchBrackets();
    bracketMatch.displayResult();

    bracketMatch.setExpression(`{a+9-(c+d-e+[a+b])}}`); //extra closing
    bracketMatch.matchBrackets();
    bracketMatch.displayResult();

    bracketMatch.setExpression(`{{a+9-(c+d-e+[a+b])}`); //extra opening
    bracketMatch.matchBrackets();
    bracketMatch.displayResult();
  }
}

// un-comment this line of code to see the functionality in motion
// BracketMatch.demo();

module.exports = BracketMatch;
