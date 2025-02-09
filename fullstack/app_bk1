let express = require('express');
let app = express();
let port = 9801;

//default route
app.get('/',(req,res) => {
    res.send("Hii From Express")
});

app.get('/products',(req,res)=>{
    res.send("This is the location route")
});

app.get('/details',(req,res) => {
    res.send('Details of Products')
})

app.get('/category',(req,res)=>{
    res.send("This is the location route")
});

app.get('/details',(req,res) => {
    res.send('Details of category')
})

app.listen(port,(err) => {
    if(err) throw err;
   // console.log("Server is running on port "+port)
    console.log(`Server is running on port ${port}`)
});