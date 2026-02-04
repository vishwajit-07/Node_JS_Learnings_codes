console.log("Welcome to node js-- server side rendering");

const Demo = () => {
  return a + b;
};
console.log(Demo(20, 40));
console.log(Demo(100));

//callback function
function a() {
  console.log("Hello function A");
}

function b(callback) {
  callback();
  console.log("Hello function B");
}
b(a);

const Calci = (a, b) => {
  return a + b;
};

const Addition = (callback, x, y) => {
  let result = callback(20, 30) + (x + y);
  console.log("Addition is ", result);
};

Addition(Calci, 100, 200);

//Higher order functions
//such a function as we passing one function into another another function as a argument.
function Multi(x) {
  return function B(y) {
    console.log(x * y);
  };
}
Multi(20)(12);

