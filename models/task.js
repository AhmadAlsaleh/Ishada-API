const mongoose = require('mongoose');

const task = mongoose.Schema({
    title : String,
    description : String,
    ownerID : String,
    status : String,
    creationDate : String,
    todoDate : String,
    taskUser : [ { userID : String } ]
});

module.exports = mongoose.model('Task', task);