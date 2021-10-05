const util = require('util');
const db = require('mongoose');
const mongoclient = require('mongodb').MongoClient;
const assert = require('assert');


db.connect('mongodb+srv://RealTimeChat:Magael2215@cluster0.o54xm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology:true});





module.exports = db;

