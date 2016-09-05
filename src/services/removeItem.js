let removeItem = (req, connection, cb) => {
    console.log(req.body.item_id);
    connection.query('DELETE FROM items WHERE item_id= ? ',
        [ req.body.item_id ],
        (err, sql) => {
            err ? cb(err) : cb(null, JSON.stringify({ success: 'removed item' }));
        }
    );
};

module.exports = removeItem;