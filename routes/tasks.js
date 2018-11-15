var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var connectionURL = 'mongodb://ahmad:A16248Ba@ds161183.mlab.com:61183/ishada_db';
var mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    mongoose.connect(connectionURL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }

        var taskColl = db.collection('tasks');
        taskColl.find({}).toArray((err, tasks) => {
            if (err) {
                res.status(400).json({
                    "message" : err.message
                });
                return;
            }

            res.send(tasks);

        });

    });
});

router.get('/:id', (req, res, next) => {
    mongoose.connect(connectionURL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }
        var o_id = new mongo.ObjectID(req.params.id);

        var taskColl = db.collection('tasks');
        taskColl.findOne({ _id : o_id }, (err, task) => {
            if (err) {
                res.status(400).json({
                    "message" : err.message
                });
                return;
            }
            if (task == null) {
                res.json({
                    "message" : "No Task"
                });
                return;
            }
            res.send(task);
        });
    });
});

router.post('/newTask', (req, res, next) => {
    mongoose.connect(connectionURL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }

        var taskColl = db.collection('tasks');
        taskColl.insertOne({
            title : req.body.title,
            description : req.body.description,
            ownerID : req.body.ownerID,
            status : req.body.status,
            creationDate : new Date(),
            todoDate : req.body.todoDate,
            taskUser : req.body.users
        }, (err, result) => {
            if (err) {
                res.status(400).json({
                    "message" : err.message
                });
                return;
            }
            
            res.json({
                "message" : "Task Created!",
                "taskID" : result.taskID
            });
        });
    });
});

router.delete('/deleteTask/:id', (req, res, next) => {
    mongoose.connect(connectionURL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }
        var o_id = new mongo.ObjectID(req.params.id);

        var taskColl = db.collection('tasks');
        taskColl.deleteOne({ _id : o_id }, (err, result) => {
            if (err) {
                res.status(400).json({
                    "message" : err.message
                });
                return;
            }

            res.json({
                "message" : "Task Deleted!",
                "taskID" : o_id
            });

        });

    });
});

router.post('/assignTask', (req, res, next) => {
    mongoose.connect(connectionURL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }
        var o_id = new mongo.ObjectID(req.body.taskID);

        var taskColl = db.collection('tasks');
        taskColl.update({ _id : o_id }, 
            { $set : { taskUser : req.body.users, status : "TODO" } }, 
            (err, data) => {
            if (err) {
                res.send(err.message);
                return;
            }
            res.send(data);
        });
    });
});

router.post('/changeStatus', (req, res, next) => {
    mongoose.connect(connectionURL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }
        var o_id = new mongo.ObjectID(req.body.taskID);
        var taskColl = db.collection('tasks');
        taskColl.update({ _id : o_id } , { $set : { status : req.body.status } }, (err, data) => {
            if (err) {
                res.status(400).json({
            "message" : err
        });
                return;
    }
    res.send(data);
});
    });
});

module.exports = router;
