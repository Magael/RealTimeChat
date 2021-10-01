const db = require('./db');
const bcrypt = require('bcrypt');

//function User() {};

const User = {
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

    
        let sql = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;

        db.query(sql, Object.values(body), (err, lastId) => {
            if (err) throw err;
            callback(lastId);
        });
    },

    login: (username, password, callback) => {
        User.find(username, (result) => {
            if (result) {
                
                if (bcrypt.compareSync(password, result[0].password)) {
                    callback(result);
                    return;
                }
            }
            callback(null);
        });

    }
}
module.exports = User;
