const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
// inicializar app express
const app = express();
//app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(
    'mongodb://localhost:27017/system-users', 
    { 
        useNewUrlParser : true , 
        useUnifiedTopology: true 
    });

    mongoose.connection
        .once('open', () => console.log('Connected !!!'))
        .on('error', error => { console.log('Your ERROR', error)})

//require('./models/Users.js')


app.use('/api', require('./routes/routes.js'));
app.use('/files',express.static(path.resolve(__dirname,'..','uploads','images')))


app.listen(2000, () => {
    console.log('Servidor em execução no porta 2000');
})