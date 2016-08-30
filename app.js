'use strict';

let express         = require('express');
let app             = express();
let path            = require('path');
let port            = process.env.PORT || 8000;
let session         = require('express-session');
let passportConfig  = require('./src/config/passportConfig');
let bodyParser      = require('body-parser');
let mysql           = require('mysql');
let dbinfo          = require('./.dbinfo');
let connection      = mysql.createConnection(dbinfo);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

passportConfig(app, connection);

let authRouter = require('./src/routes/authRouter')(connection);
app.use('/auth', authRouter);

let actionsRouter = require('./src/routes/actionsRouter')(connection);
app.use('/actions', actionsRouter);

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log('listening on ', port);
});
