const calci = (num1, num2, opn) => {
  switch (opn) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      "Invalid data";
  }
};

module.exports = calci;
