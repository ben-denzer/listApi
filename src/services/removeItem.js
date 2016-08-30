let removeItem = (req, connection, cb) => {
    connection.query('DELETE FROM items WHERE item_id= ? ',
        [ req.body.item_id ],
        (err, sql) => {
            err ? cb(err) : cb(null, JSON.stringify({ success: 'removed item' }));
        }
    );
};

module.exports = removeItem;