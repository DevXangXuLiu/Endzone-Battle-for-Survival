const express = require('express');
const app = express();
const port = 5000;

app.use(express.urlencoded({extended: true}));
var info = require('./api/info');
app.use('/info', info);

app.listen(port, ()=> {
    console.log('Server is connected at port: ' + port);
})