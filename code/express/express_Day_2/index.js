const express = require("express");
const app = express();
app.use(express.static("public/"));
const menu = `
<ul>
<li><a href ="/">Home</a></li>
<li><a href ="/about">About Us</a></li>
<li><a href ="/contact">Contact Us</a></li>
<li><a href ="/object">Object page</a></li>
</ul>
`;
app.get("/", (req, res) => {
  res.send(menu + "<h1>Home page</h1>");
});

app.get("/about", (req, res) => {
  res.send(
    menu +
      `<h1>About Us page</h1>
    <img src="/file.svg"/>`,
  );
});

app.get("/contact", (req, res) => {
  res.send(menu + "<h1>Contact Us page</h1>");
});
app.get("/object", (req, res) => {
  res.send({
    name: "Vishwajit",
    education: "MCA",
    address: "Ratnagiri",
  });
});

app.use((req, res) => {
  res.send(`<h1>404, Page Not Found</h1>
    <a href="/">Back to home </a>`);
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
