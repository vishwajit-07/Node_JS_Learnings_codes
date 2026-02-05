const http = require("http");
const url = require("url");
const app = http.createServer((req, res) => {
  res.write("<h1>Node JS Server</h1>");
  const url_link = url.parse(req.url);
  console.log(url_link);
  res.end("Server end");
});

const PORT = 5000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
