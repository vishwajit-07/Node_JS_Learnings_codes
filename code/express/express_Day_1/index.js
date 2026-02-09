const express = require("express");
const app = express();

//routing define
//app.get('url',callback_function)

app.get("/", (req, res) => {
  //   res.writeHead(200, { "content-type": "text/html" });
  //   res.write("<h1>ExpressJS</h1>");
  //   res.write("<marquee><h1>Express5.2.1 Fast, unopinionated, minimalist web framework for Node.js</h1></marquee>");
  //   res.end();
  res.send(
    "<h1 style='text-align:center'>Welcome to Express Server</h1></br><marquee><h2>Express5.2.1 Fast, unopinionated, minimalist web framework for Node.js</h2></marquee>",
  );
});

const HOST = "127.0.0.1";
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server is up http://${HOST}:${PORT}`);
});
