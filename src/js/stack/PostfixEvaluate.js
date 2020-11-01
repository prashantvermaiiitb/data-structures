const InfixToPostFix = require("./InfixToPostfix");
const Stack = require("./Stack");

/**
 * Example for evaluating the postfix operation generated
 */
class PostfixEvaluate {
  /**
   * constructor
   * @param {*} inputExpression
   */
  constructor(inputExpression) {
    this.infixToPostFix = new InfixToPostFix(inputExpression);
    this.stack = new Stack();
  }

  /**
   * Setting the input Expression
   * @param {*} inputExpression
   */
  setExpression(inputExpression) {
    this.infixToPostFix = new InfixToPostFix(inputExpression);
    this.stack = new Stack();
  }
  /**
   * Extracting the digits from the Postfix output expression
   * @param {*} startPosition
   */
  extractDigits(startPosition) {
    const endIndex = this.infixToPostFix.outputExpression.indexOf(
      ")",
      startPosition
    );
    // console.log(
    //   this.infixToPostFix.outputExpression.substring(
    //     startPosition + 1,
    //     endIndex
    //   )
    // );
    return this.infixToPostFix.outputExpression.substring(
      startPosition + 1,
      endIndex
    );
  }
  /**
   * Evaluate the postfix expression.
   */
  evaluateExpression() {
    this.infixToPostFix.convertInfixToPostFix();
    // console.log(this.infixToPostFix.outputExpression);
    let tmp, char;
    for (let i = 0; i < this.infixToPostFix.outputExpression.length; ) {
      // number starts
      char = this.infixToPostFix.outputExpression.charAt(i);
      if (char == "(") {
        tmp = this.extractDigits(i);
        this.stack.push(tmp);
        i += tmp.length + 2; // +2 for the start-end braces
        // this.stack.display();
      } else {
        let num2 = parseFloat(this.stack.pop()),
          num1 = parseFloat(this.stack.pop()),
          intermediateResult = 0;
        switch (char) {
          case "+":
            intermediateResult = num1 + num2;
            break;
          case "-":
            intermediateResult = num1 - num2;
            break;
          case "/":
            intermediateResult = num1 / num2;
            break;
          case "*":
            intermediateResult = num1 * num2;
            break;
        }
        this.stack.push(intermediateResult);
        i++;
        // this.stack.display();
      }
    }
  }
  /**
   * Displaying the outcome for the page.
   */
  display() {
    console.log("-----------------------------------------------------");
    console.log(`Input Expression : ${this.infixToPostFix.inputExpression}`);
    console.log(`Postfix Expression: ${this.infixToPostFix.outputExpression}`);
    console.log(`Result of the Evaluation : ${this.stack.pop()}`);
    console.log("-----------------------------------------------------");
  }
  /**
   * Demo function
   */
  static demo() {
    let postfixEvaluation = new PostfixEvaluate(`3+4-5`);
    postfixEvaluation.evaluateExpression();
    postfixEvaluation.display();

    postfixEvaluation.setExpression(`34+78-(90*2)+9/2`);
    postfixEvaluation.evaluateExpression();
    postfixEvaluation.display();

    postfixEvaluation.setExpression(`3+7-(9*2)+9/2`);
    postfixEvaluation.evaluateExpression();
    postfixEvaluation.display();
  }
}

PostfixEvaluate.demo();
