require('dotenv').config();

const config = require("./config");

const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
var timeout = require('connect-timeout');
const app = express();

app.set('port', process.env.PORT || config.APP_HOST);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(timeout(120000));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

app.use('/sabi/', require('./routes/api.sabi.routes'));
app.get('/', async (req, res) => {      
    res.status(200).json({
        "message": "Sabi ready"
    });
});

const connectToDatabase = require('./db');
connectToDatabase();

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
