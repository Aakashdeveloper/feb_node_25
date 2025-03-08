const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const AuthController = require('./controller/AuthController');
const port = process.env.PORT || 5001;

app.use(cors());
app.use('/api/auth',AuthController);

app.listen(port,() => {
    console.log(`Running on port ${port}`)
})