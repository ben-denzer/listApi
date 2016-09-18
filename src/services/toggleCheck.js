let toggleCheck = (req, connection, cb) => {
    connection.query(
        'UPDATE items SET checked = ? WHERE item_id = ?',
        [ req.body.newStatus, req.body.item_id ],
        (err, rows) => {
            err ? cb(err) : cb(null, JSON.stringify({success: true}));
        }
    );
};

module.exports = toggleCheck;