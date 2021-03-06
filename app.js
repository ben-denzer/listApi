'use strict';

let express         = require('express');
let app             = express();
let port            = process.env.PORT || 8000;
let passportConfig  = require('./src/config/passportConfig');
let mysql           = require('mysql');
let dbinfo          = require('./.dbinfo');
let connection      = mysql.createConnection(dbinfo);
// let morgan          = require('morgan');

// app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

passportConfig(app, connection);

let authRouter = require('./src/routes/authRouter')(connection);
app.use('/listApi/auth', authRouter);

let actionsRouter = require('./src/routes/actionsRouter')(connection);
app.use('/listApi/actions', actionsRouter);

app.listen(port, (err) => {
    // if (err) console.error(err);
    // console.log('listening on ', port);
});
