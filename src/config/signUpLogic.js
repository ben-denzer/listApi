'use strict';

let passport        = require('passport');
let bcrypt          = require('bcrypt');

module.exports = (username, password, connection, cb) => {
    let success = () => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return cb('hashing error');

            connection.query(
                'INSERT INTO users(username, password) VALUES( ? , ? )',
                [ username, hash ],
                (err, res) => {
                    if (err) return cb('error saving to db');

                    let newUser = {
                        username,
                        id: res.insertId
                    };
                    cb(null, newUser);
                }
            );
        });
    };

    connection.query(
        'SELECT u.username FROM users u WHERE u.username = ?',
        [ username ],
        (err, rows) => {
            if (err) return cb('db connection error');
            if (rows.length) return cb(null, {error: 'username is taken'});
            return success();
        }
    );
};