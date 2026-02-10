const http = require("http");
const url = require("url");
const menu = `
<ul>
<li><a href ="/">Home</a></li>
<li><a href ="/about">About Us</a></li>
<li><a href ="/contact">Contact Us</a></li>
</ul>
`;
const app = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  let url_Data = url.parse(req.url, true);

  if (url_Data.pathname === "/") {
    res.write(menu + "<h1>Home Page</h1>");
  } else if (url_Data.pathname === "/about") {
    res.write(menu + "<h1>About Page</h1>");
  } else if (url_Data.pathname === "/contact") {
    res.write(menu + "<h1>Contact Us page</h1>");
  } else {
    res.write("<h1>404,Page Not Found</h1>");
  }
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
