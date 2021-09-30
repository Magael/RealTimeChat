const util = require('util.promisify');
const mysql = require('mysql');
const {connect} = require('../app');

const Pool = mysql.createPool({
    host:'localhost',
    username:'root',
    password:'',
    database:'chat'
});

Pool.getConnection((err,connection)=>{
    if (err)
        console.error('Something went wrong connecting to the database...');
    if(connection)
        connection.release();
    return;
});

Pool.query = util(Pool.query);

module.exports = Pool;
