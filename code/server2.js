const http = require("http");
const url = require("url");
const app = http.createServer((req, res) => {
  res.write("<h1>Node JS Server</h1>");
  const url_link =
    "https://www.google.com/search?q=macbook+pro+512gb&oq=macbook+pro+5&gs_lcrp=EgZjaHJvbWUqBwgBEAAYgAQyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCTEwNTI1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8";
  const result = url.parse(url_link, true);
  console.log(result);
  // res.write("<h1>Node JS Server</h1>")

  // for (let i = 0; i <= 100; i++) {
  //     res.write(" " + i)
  // }

  // for(let i=0;i<=200;i++)
  // {
  //     res.write("<input type='text'>")
  // }

  // for(let i=0;i<=3000;i++)
  // {
  //     res.write(`<div style='height:${i}px;width:${i}px;display:inline-block;margin:10px;background-color:orange'></div>`)
  // }

  res.end("response end");
});

const PORT = 3000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`Server Is running...http://${HOST}:${PORT}`);
});
