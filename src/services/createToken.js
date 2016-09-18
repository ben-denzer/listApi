const jwt       = require('jsonwebtoken');
const jwtSecret = require('../../.jwtSecret').secret;

const createToken = (user, cb) => {
    if (!user) return cb('no user');
    cb(null,
        jwt.sign(
            {
                username: user.username,
                id: user.id
            },
            jwtSecret,
            {}
        )
    );
};

module.exports = createToken;
