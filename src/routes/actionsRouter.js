'use strict';

let express         = require('express');
let actionsRouter   = express.Router();
let bodyParser      = require('body-parser');
let passport        = require('passport');
let addItem         = require('../services/addItem');
let removeItem      = require('../services/removeItem');
let removeList      = require('../services/removeList');

let router = (connection) => {

    actionsRouter.use(bodyParser.json());

    actionsRouter.post('/addItem',
        passport.authenticate('local'),
        (req, res) => {
            console.log(req.user, req.body);
            addItem(req, connection, (err, data) => {
                err ? res.status(500).send() : res.status(200).send(data);
            });
        }
    );

    actionsRouter.post('/removeItem',
        passport.authenticate('local'),
        (req, res) => {
            removeItem(req, connection, (err, data) => {
                err ? req.status(500).send() : req.status(200).send(data);
            });
        }
    );

    actionsRouter.post('/removeList',
        passport.authenticate('local'),
        (req, res) => {
            removeList(req, connection, (err, data) => {
                err ? res.status(500).send() : res.status(200).send(data);
            });
        }
    );

    return actionsRouter;
}

module.exports = router;