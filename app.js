const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))


//app.set('view engine', 'html');
//app.engine('html',require('http').__express);

app.use(express.static(__dirname));


const index = require('./sites/index');

app.use('/',index);




app.listen(3000)