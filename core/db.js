const util = require('util');
const mysql = require('mysql');
//const { connect } = require('../app');

const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'chat'
});

db.connect((err,connection)=>{
    if (err)
        console.error('something went wrong...'+ err);
   /* if(connection)
        connection.release();
    return;*/
});

db.query = util.promisify(db.query);

module.exports = db;

