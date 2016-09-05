let toggleCheck = (req, connection, cb) => {
    console.log(req.body.newStatus, req.body.item_id);
    connection.query(
        'UPDATE items SET checked = ? WHERE item_id = ?',
        [ req.body.newStatus, req.body.item_id ],
        (err, rows) => {
            console.log('in cb', err, rows);
            err ? cb(err) : cb(null, JSON.stringify({success: true}));
        }
    );
};

module.exports = toggleCheck;