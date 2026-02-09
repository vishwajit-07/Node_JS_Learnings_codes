const http = require("http")
const app = http.createServer((req,res)=>{
    res.write("<h1>Node Js</h1>");
    res.end();
})

const PORT = 3000;
const HOST = 127.0.0.1;
app.listen(PORT,HOST,()=>{
    console.log(`Server is up http://${HOST}:${PORT}`);
})