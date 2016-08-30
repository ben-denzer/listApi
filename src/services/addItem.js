let addItem = (req, connection, cb) => {
    console.log(req.body.item_name, req.body.list_name, req.user.id, req.body.comments);
    connection.query('INSERT INTO items(item_name, list_name, user_pk, comments, checked) VALUES( ? , ? , ? , ?, 0)',
        [ req.body.item_name, req.body.list_name, req.user.id, req.body.comments ],
        (err, sql) => {
            err ? console.log(err) : cb(null, JSON.stringify({ item_id: sql.insertId }));
        }
    );
};

module.exports = addItem;