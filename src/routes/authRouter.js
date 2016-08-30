'use strict';

let express         = require('express');
let authRouter      = express.Router();
let signUpLogic     = require('../config/signUpLogic');
let bodyParser      = require('body-parser');
let jsonParser      = bodyParser.json();
let passport        = require('passport');
let getAllItems     = require('../services/getAllItems');

let router = (connection) => {
    authRouter.post('/',
        jsonParser,
        passport.authenticate('local'),
        (req, res) => {
            res.status(200).send(JSON.stringify(req.user));
        }
    );

    authRouter.post('/signup', jsonParser, (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        signUpLogic(username, password, connection, (err, user) => {
            if (err) return res.status(500).send(err);
            req.login(user, () => res.send(JSON.stringify(user)));
        });
    });

    authRouter.post('/login',
        jsonParser,
        passport.authenticate('local'),
        (req, res) => {
            getAllItems(req.user.id, connection, (err, data) => {
                err ? res.status(500).send(err) : res.status(200).send(JSON.stringify(data));
            });
        }
    );

    return authRouter;
}

module.exports = router;