let express = require('express');
let app = express();
let port = 9801;
let categoryRouter = require('./src/controller/categoryRouter')();
let productRouter = require('./src/controller/productRouter')();

//default route
app.get('/',(req,res) => {
    res.send("Hii From Express")
});


app.use('/category',categoryRouter)
app.use('/products',productRouter)

app.listen(port,(err) => {
    if(err) throw err;
   // console.log("Server is running on port "+port)
    console.log(`Server is running on port ${port}`)
});