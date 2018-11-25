var mongoose = require('mongoose');

const meeting = mongoose.Schema({
    title: String,
    startDate: String,
    endDate: String,
    num: Number,
    items: [{
        num: Number,
        subject: String,
        extra: String,
        users: [String]
    }],
    users: [String]
});

module.exports = mongoose.model('Meeting', meeting);