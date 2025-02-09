let express = require('express');
let productRouter = express.Router()

function router(){

    productRouter.route('/')
        .get((req,res) => {
        res.send("This is the Product route")
    })
    
    productRouter.route('/details')
        .get((req,res) => {
        res.send('Details of Products')
    })

    return productRouter
}

module.exports = router