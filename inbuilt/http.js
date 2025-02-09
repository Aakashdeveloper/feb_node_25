let http = require('http')

//req > what we send to server(params,queryParam,body)
//res > what server send in return 

let server = http.createServer((req,res)=>{
    res.write('<h1>This is NodeJs App Server</h1>')
    res.end()
})

server.listen(7800,(err)=>{
    if(err) throw err;
    console.log(`Server running on port 7800`)
})