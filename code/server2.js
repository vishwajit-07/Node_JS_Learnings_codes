const http = require('http')
const app = http.createServer((req, res) => {

    res.write("<h1>Node JS Server</h1>")
    res.write("<h1>Node JS Server</h1>")


    for (let i = 0; i <= 100; i++) {
        res.write(" " + i)
    }


    for(let i=0;i<=200;i++)
    {
        res.write("<input type='text'>")
    }

    for(let i=0;i<=3000;i++)
    {
        res.write(`<div style='height:${i}px;width:${i}px;display:inline-block;margin:10px;background-color:orange'></div>`)
    }

    res.end('response end')


})

const PORT = 3000
const HOST = '127.0.0.1'
app.listen(PORT, HOST, () => {
    console.log(`Server Is running...http://${HOST}:${PORT}`)
})