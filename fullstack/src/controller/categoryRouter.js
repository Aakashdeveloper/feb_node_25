let express = require('express');
let categoryRouter = express.Router();

function router(){
    categoryRouter.route('/')
        .get((req,res) => {
        res.send("This is the Category route")
    })

    categoryRouter.route('/details')
        .get((req,res) => {
            res.send('Details of category')
    })


    categoryRouter.route('/abc')
        .get((req,res) => {
            res.send('Details of category')
    })

    return categoryRouter
}

module.exports = router
