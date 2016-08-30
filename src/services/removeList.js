let removeList = (req, connection, cb) => {
    connection.query('DELETE FROM items WHERE list_name = ? AND user_pk = ?',
        [ req.body.list_name, req.user.id ],
        (err, sql) => {
            err ? cb(err) : cb(null, JSON.stringify({ success: 'list removed' }));
        }
    );
};

module.exports = removeList;