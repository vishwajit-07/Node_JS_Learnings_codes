const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const url = require("url");

app.get("/", (req, res) => {
  res.render("add_product.ejs");
});

//for post method in form

app.post("/saveform", (req, res) => {
  const POST_Data = req.body;
  res.render("product_details.ejs", { data: POST_Data });
});

//for get method in form

// app.get("/saveform", (req, res) => {
//   const get_Data = url.parse(req.url, true);
//   res.render("product_details.ejs", { data: get_Data });
// });

const HOST = "127.0.0.1";
const PORT = 3000;
app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
