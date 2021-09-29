const util = require('util.promisify');
const mysql = require('mysql');
const { connect } = require('../app');

const db = mysql.createPool({
    host:'localhost',
    username:'root',
    password:'',
    database:'chat'
});

db.getConnection((err,connection)=>{
    if (err)
        console.error('Something went wrong connecting to the database...');
    if(connection)
        connection.release();
    return;
});

db.query = util(db.query);

module.exports = db;