let removeItem = (req, connection, cb) => {
    const hitDB = (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM items WHERE item_id= ? ',
                [ id ],
                (err, sql) => {
                    err ? reject(err) : resolve();
                }
            );
        });
    };
    Promise.all(req.body.trash.map(a => hitDB(a))).then(
        () => cb(null, JSON.stringify({ success: 'removed item' })),
        (err) => cb(err)
    );
};

module.exports = removeItem;