let fs = require('fs')
let http = require('http');

let server = http.createServer(function(req,res){
    //reading json file
    fs.readFile('city.json','utf-8',function(err,data){
        if(err) throw err
        //return data of file
        res.write(data);
        res.end()
    })
})

server.listen(9822)