'use strict';

let express         = require('express');
let authRouter      = express.Router();
let signUpLogic     = require('../config/signUpLogic');
let bodyParser      = require('body-parser');
let jsonParser      = bodyParser.json();
let passport        = require('passport');
let getAllItems     = require('../services/getAllItems');
let jwt             = require('jsonwebtoken');
let createToken     = require('../services/createToken');

let router = (connection) => {

    authRouter.post('/signup', jsonParser, (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        signUpLogic(username, password, connection, (err, user) => {
            if (err) return res.status(500).send(err);
            if (user.error) return res.status(403).send(JSON.stringify({error: 'username is taken'}));
            req.login(user, () => {
                createToken(user, (err, token) => {
                    if (err) return res.status(500).send(err);
                    res.send(JSON.stringify({token}));
                });
            });
        });
    });

    authRouter.post('/login', jsonParser, passport.authenticate('local'), (req, res) => {
            createToken(req.user, (err, token) => {
                if (err) res.status(500).send(err);
                getAllItems(req.user.id, connection, (err, lists) => {
                    if (err) return res.status(500).send(err);
                    res.status(200).send(JSON.stringify({token, lists}));
                });
            });
        }
    );

    authRouter.post('/checkUsername', jsonParser, (req, res) => {
        connection.query('SELECT u.user_id FROM users u WHERE u.username = ?',
            [req.body.username],
            (err, rows) => {
                if (err) return res.status(500).send();
                rows.length ?
                    res.status(200).send(JSON.stringify({error: 'username taken'})) :
                    res.status(200).send(JSON.stringify({success: 'ok'}));
            }
        );
    });

    return authRouter;
}

module.exports = router;