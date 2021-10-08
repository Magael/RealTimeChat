const util = require('util');
const db = require('mongoose');
const mongoclient = require('mongodb').MongoClient;
const assert = require('assert');


require("dotenv").config();

db.connect(process.env.DATABASE, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
});

db.connection.on('error',(err)=>{
    console.log("Mongoose connection ERROR: " + err.message);
});

db.connection.once("open",()=>{
    console.log("MongoDB connected!");
});



module.exports = db;

