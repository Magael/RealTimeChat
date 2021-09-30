const db = require('./db');
const bcrypt = require('bcrypt');

function User() { };

User.prototype = {
    //find user data by Id or username
    find: (user = null, callback) => {
        if (user) {
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        db.query(sql, user, (err, result) => {
            if (err) throw err
            callback(result);
        });
    },

    create: (body, callback) => {
        let password = body.password;
        body.password = bcrypt.hashSync(password, 8);

        let bind = [];

        for (prop in body) {
            bind.push(prop);
        }

        let sql = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;

        db.query(sql, bind, (err, lastId) => {
            if (err) throw err;
            callback(lastId);
        });
    },

    login: (username, password, callback) => {
        this.find(username, (result) => {
            if (result) {
                if (bcrypt.compareSync(password, result.password)) {
                    callback(result);
                    return;
                }
            }
            callback(null);
        });

    }
}
module.exports = User;
