console.log(undefined + 1);
console.log(null + 1);
console.log(true + false);
console.log("5" + 3);
console.log("5" - 3);
console.log("5" * "2");
console.log("5" / 0);
console.log(NaN + 1);
console.log(typeof NaN);
console.log(typeof null);
console.log(10 == "10");
console.log(10 === "10");
console.log(false == "0");
console.log(false === "0");
console.log([] == false);
console.log([] === false);
console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log(true + true);
console.log(!!"false");
console.log(Boolean(""));
console.log(Boolean(" "));
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
console.log(typeof typeof 100);
console.log(0 || "JS");
console.log("JS" && 0);
console.log(0 && "JS");
console.log("" || "Default");
console.log(+"10");
console.log(+true);
console.log(+false);
console.log("10" - "5");
console.log("10" + "5");
console.log("10" * 2);
console.log("10" / 2);
console.log(null == undefined);
console.log(null === undefined);
console.log([] == "");
console.log([1,2] == "1,2");
console.log({} == {});
console.log([] == []);
console.log(Object.is(NaN, NaN));
console.log(NaN === NaN);
console.log(0.1 + 0.2 === 0.3);
console.log(typeof []);
console.log(typeof function(){});
console.log(typeof Infinity);
console.log(1 / "a");
console.log(a);
var a = 10;
// console.log(b);
// let b = 20;

// console.log(c);
// const c = 30;

// var x = 10;
// {
//   var x = 20;
// }
// console.log(x);

// let y = 10;
// {
//   let y = 20;
// }
// console.log(y);

// const z = 10;
// z = 20;

function test() {
  console.log(a);
  var a = 10;
}
test();

// function test() {
//   console.log(b);
//   let b = 10;
// }
// test();

// console.log(foo);
// function foo() {}

console.log(bar);
var bar = function(){};

{
  function a() {}
}
console.log(typeof a);

for(var i=0;i<3;i++){}
console.log(i);

const obj = {a:1};
obj.a = 2;
console.log(obj.a);

// const obj = {a:1};
// obj = {a:2};

var a = 1;
function test(){
  console.log(a);
  var a = 2;
}
test();

