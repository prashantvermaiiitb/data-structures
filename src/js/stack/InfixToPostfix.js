/**
 * Class for converting infix to postfix expression
 * (a+b)-c+d/e will be converted to ab+c-ed/+
 *
 */
let BracketChecker = require("./BracketMatch"); // included for the validation
let Stack = require("./Stack"); // for the conversion
let PRECEDENCE = {
  HIGH: 2,
  LOW: 1,
};
let DIGITS = []; //for searching for 2 digit numbers
for (let digit = 0; digit < 10; digit++) {
  DIGITS.push(`${digit}`);
}
class InfixToPostfix {
  /**
   * constructor function
   */
  constructor(inputExpression) {
    this.inputExpression = inputExpression;
    this.outputExpression = "";
    this.bracketChecker = new BracketChecker(inputExpression);
    this.stack = new Stack();
  }
  /**
   * setting input bracket Expression
   * @param {*} inputExpression
   */
  setExpression(inputExpression) {
    this.inputExpression = inputExpression;
    this.outputExpression = "";
    this.bracketChecker.setExpression(inputExpression);
    this.stack = new Stack();
  }
  /**
   * checking expression is valid or not
   * for now we are checking only the brackets are being placed properly or not
   */
  isExpressionValid() {
    this.bracketChecker.matchBrackets();
    return this.bracketChecker.isExpressionValid;
  }

  /**
   * Getting precedence for the operators
   * @param {*} operator
   */
  getPrecedenceOfOperator(operator) {
    switch (operator) {
      case "+":
      case "-":
        return PRECEDENCE.LOW;
      case "*":
      case "/":
        return PRECEDENCE.HIGH;
    }
  }
  /**
   * Till we get the '(' in the stack
   * pop-off the element and append them in the output expression.
   */
  handleClosingBracket() {
    while (!this.stack.isEmpty()) {
      let tempChar = this.stack.pop();
      if (tempChar == "(") {
        break;
      }
      this.outputExpression += tempChar;
    }
  }

  /**
   * Handling the operator that are being passed to page
   * @param {*} inputOperator
   * @param {*} inputOperatorPrecedence
   */
  handleOperator(inputOperator, inputOperatorPrecedence) {
    while (!this.stack.isEmpty()) {
      let operatorOnTop = this.stack.pop();
      let operatorOnTopPrecedence = this.getPrecedenceOfOperator(operatorOnTop);
      if (operatorOnTopPrecedence >= inputOperatorPrecedence) {
        this.outputExpression += operatorOnTop;
      } else {
        this.stack.push(operatorOnTop);
        break;
      }
    }
    this.stack.push(inputOperator);
    // this.stack.display();
  }

  /**
   * Getting digits in the operand
   * @param {*} startPosition
   */
  getDigits(startPosition) {
    let tmp = "";
    for (let i = startPosition; i < this.inputExpression.length; i++) {
      if (!DIGITS.includes(this.inputExpression.charAt(i))) break;

      tmp += this.inputExpression.charAt(i); //appending
    }
    return tmp;
  }

  /**
   * converting Infix to Postfix
   */
  convertInfixToPostFix() {
    if (this.isExpressionValid()) {
      for (let i = 0; i < this.inputExpression.length; ) {
        let char = DIGITS.includes(this.inputExpression.charAt(i))
          ? this.getDigits(i, this.inputExpression)
          : this.inputExpression.charAt(i);
        i += char.length;
        switch (char) {
          case "+":
          case "-":
          case "*":
          case "/":
            this.handleOperator(char, this.getPrecedenceOfOperator(char));
            break;
          case "(":
            this.stack.push(char);
            break;
          case ")":
            this.handleClosingBracket();
            break;
          default:
            this.outputExpression += `(${char})`; //handling for the single as well as double digit
            break;
        }
      }
      while (!this.stack.isEmpty()) {
        this.outputExpression += this.stack.pop();
      }
    } else {
      this.bracketChecker.displayResult();
    }
  }

  /**
   * display the result of the conversion
   */
  display() {
    this.bracketChecker.isExpressionValid &&
      console.log(
        `${this.inputExpression} has postfix expression : ${this.outputExpression}.`
      );
  }

  /**
   * Demo of the functionality for the Class.
   * @todo handling for the Unary Operator has to be checked.
   */
  static demo() {
    let infixToPostfix = new InfixToPostfix(`3+4-5`);
    infixToPostfix.convertInfixToPostFix();
    infixToPostfix.display();

    infixToPostfix.setExpression(`(2-3)+7*(5+6)`);
    infixToPostfix.convertInfixToPostFix();
    infixToPostfix.display();

    infixToPostfix.setExpression(`(2-33)+78*(5+61)`);
    infixToPostfix.convertInfixToPostFix();
    infixToPostfix.display();

    infixToPostfix.setExpression(`[(2-33)+78*(5+61)`);
    infixToPostfix.convertInfixToPostFix();
    infixToPostfix.display();
  }
}

// Un-comment this line to see the functionality
// InfixToPostfix.demo();

module.exports = InfixToPostfix;