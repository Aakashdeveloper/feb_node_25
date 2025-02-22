import express from 'express';
import axios from 'axios';
import {createClient} from 'redis';
let port = 9122
let app = express();

let client = createClient({
    host:'localhost',
    port:6379
})

client.on('error', err=>console.log('Redis Client error',err))

app.get('/data',async(req,res) => {
    await client.connect();
    let userInput = req.query.country.trim();
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`

    //checking in redis
    let result = await client.get(userInput)
    if(result){
        const output = JSON.parse(result);
        res.send(output)
    }else{
        //call api
        let apiResponse = await axios.get(url);
        let apiOutput = apiResponse.data;
        //first save in redis
        await client.set(userInput,JSON.stringify({soure:'Redis Cache',apiOutput}),{EX:500,NX:true})
        res.send({soure:'Api',apiOutput})
    }
    await client.disconnect()
})

app.listen(port,() => {
    console.log(`Running on port ${port}`)
})

