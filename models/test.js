var mongoose = require('mongoose');

const test = mongoose.Schema({
    title : String,
    status: Number
});

module.exports = mongoose.model('Test', test);