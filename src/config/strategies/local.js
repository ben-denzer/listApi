'use strict';

let passport        = require('passport');
let LocalStrategy   = require('passport-local').Strategy;
let bcrypt          = require('bcrypt');

let login = (connection) => {
    passport.use(
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, cb) => {
            connection.query(
                'SELECT u.user_id, u.username, u.password FROM users u WHERE u.username= ?',
                [username],
                (err, rows) => {
                    if (!rows || !rows.length) {
                        return cb(null, false);
                    }

                    bcrypt.compare(password, rows[0].password, (err, res) => {
                        if (err) return cb(err);
                        let user = {
                            username,
                            id: rows[0].user_id
                        };
                        res ? cb(null, user) : cb(null, false);
                    });
                }
            );
        })
    );
}

module.exports = login;