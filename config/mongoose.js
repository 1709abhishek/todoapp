// connecting the mongoose and mongodb 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todoapp_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open',function(){
    console.log('connected to database :: MongoDB');
});

module.exports = db;