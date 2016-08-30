'use strict';

let sortItems = (arr, cb) => {
    let sorted = {};
    for (let i of arr) {
        if (sorted[i.list_name]) {
            sorted[i.list_name].push({item: i.item_name, checked: i.checked, item_id: i.item_id});
        } else {
            sorted[i.list_name] = [{item: i.item_name, checked: i.checked, item_id: i.item_id}];
        }
    }
    if (!sorted) return cb('error sorting');
    cb(null, sorted);
};

let getAllItems = (id, connection, cb) => {
    connection.query('SELECT i.item_name, i.list_name, i.item_id, i.checked FROM items i WHERE i.user_pk=?',
        [ id ],
        (err, rows) => {
            if (err) cb('error getting items from database');
            if (!rows.length) return cb(null, {});
            sortItems(rows, (err, data) => {
                if (err) return cb('server error sorting items');
                cb(null, data);
            });
        }
    );
};

module.exports = getAllItems;