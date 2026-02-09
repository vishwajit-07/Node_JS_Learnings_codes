// //Server create

// //used to create server
// const http = require("http");
// const app = http.createServer((request, response) => {
//   //this method used to write response
//   //we can call multiple times
//   //inside data must be in string
//   response.write("Hello welcome to NodeJS Server....");
//   //must be end
//   response.end();
// });

// const PORT = 3000;
// const HOST = "127.0.0.1";
// //You should pass port number compulsury to listen incomming requests
// app.listen(PORT, HOST, () => {
//   console.log("Server started successfully running ....");
// });

const http = require("http");
const calculator = require("./module");
const app = http.createServer((req, res) => {
  res.write("<h1>Node JS Server</h1>");
  
  let result = calculator(100, 200, "+");
  res.write("Calculation is " + result);
  
  res.end("response end");
});

const PORT = 3000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`Server Is running...http://${HOST}:${PORT}`);
});
