'use strict';

let express         = require('express');
let actionsRouter   = express.Router();
let bodyParser      = require('body-parser');
let passport        = require('passport');
let addItem         = require('../services/addItem');
let removeItems     = require('../services/removeItems');
let removeList      = require('../services/removeList');
let toggleCheck     = require('../services/toggleCheck');
let jwt             = require('jsonwebtoken');
let jwtSecret       = require('../../.jwtSecret').secret;

let router = (connection) => {

    actionsRouter.use(bodyParser.json());

    actionsRouter.post('/addItem', (req, res) => {
        jwt.verify(req.body.token, jwtSecret, (err, user) => {
            if (err) return res.status(403).send();
            addItem(req, user, connection, (err, data) => {
                err ? res.status(500).send() : res.status(200).send(data);
            });
        });
    });

    actionsRouter.post('/removeItems', (req, res) => {
        jwt.verify(req.body.token, jwtSecret, (err, user) => {
            if (err) return res.status(403).send();
            removeItems(req, connection, (err, data) => {
                err ? res.status(500).send() : res.status(200).send(data);
            });
        });
    });

    actionsRouter.post('/removeList', (req, res) => {
        jwt.verify(req.body.token, jwtSecret, (err, user) => {
            if (err) return res.status(403).send();
            removeList(req, user, connection, (err, data) => {
                err ? res.status(500).send() : res.status(200).send(data);
            });
        });
    });

    actionsRouter.post('/toggleCheck', (req, res) => {
        jwt.verify(req.body.token, jwtSecret, (err, user) => {
            if (err) return res.status(403).send();
            toggleCheck(req, connection, (err, data) => {
                err ? res.status(500).send(err) : res.status(200).send(data);
            });
        });
    });

    return actionsRouter;
}

module.exports = router;