const mongoose = require('mongoose');

const user = mongoose.Schema({
    
    fullName : String,
    username : String,
    password : String,
    phone : String,
    email : String,
    departmentID : String

});

module.exports = mongoose.model('User', user);
