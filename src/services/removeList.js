let removeList = (req, connection, cb) => {
    console.log(req.body.activeList);
    connection.query('DELETE FROM items WHERE list_name = ? AND user_pk = ?',
        [ req.body.activeList, req.user.id ],
        (err, sql) => {
            err ? cb(err) : cb(null, JSON.stringify({ success: 'list removed' }));
        }
    );
};

module.exports = removeList;