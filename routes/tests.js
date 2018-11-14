var express = require('express');
var router = express.Router();
var connectionURL = 'mongodb://ahmad:A16248Ba@ds161183.mlab.com:61183/ishada_db'
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {  
    mongoose.connect(connectionURL, { useNewUrlParser: true }, function(err, db) {
        if (err) {
            res.send(err.message);
            return;
        }
    var collection = db.collection('test');
    collection.insert({"basicInfo": {
        "title": "test",
        "status": "new"
    }
    });
        collection.find({}, {}).toArray(function(err, data) {
            res.send(data);
        });
    });
});

module.exports = router;
