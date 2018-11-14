var express = require('express');
var router = express.Router();
var dateTime = require('node-datetime');

const Task = require('../models/task');

router.get('/', (req, res, next) => {
    Task.find({}, (err, tasks) => {
        if (err) {
            res.status(400).json({
                "message" : "Error"
            });
            return;
        }
        res.send(tasks);
    });
});

router.get('/:id', (req, res, next) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
        } else {
            res.send(task);
        }
    });
});

router.post('/newTask', (req, res, next) => {
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    new Task({
        title : req.body.title,
        description : req.body.description,
        ownerID : req.body.ownerID,
        status : req.body.status,
        creationDate : formatted,
        todoDate : req.body.todoDate,
        taskUser : req.body.users
    })
    .save()
    .then(result => {
        res.json({
            "message" : "Task Created!",
            "taskID" : result.taskID
        });
    })
    .catch(err => {
        res.status(400).json({
            "message" : "error"
        });
    });
});

router.delete('/deleteTask/:id', (req, res, next) => {
    Task.deleteOne({_id : req.params.id }, (err) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return
        }
        res.json({
            "message" : "task deleted!"
        });
    })
});

router.post('/assignTask', (req, res, next) => {
    Task.update({ _id : req.body.taskID }, { taskUser : req.body.users } , { multi: true },
        (err, data) => {
            if (err) {
                res.send(err.message);
                return;
            }
            res.send(data);
        });
});

router.post('/changeStatus', (req, res, next) => {
    Task.update({ _id : req.body.taskID } , { status : req.body.status }, (err, data) => {
        if (err) {
            res.status(400).json({
		"message" : err
	});
            return;
        }
        res.send(data);
    });
});

module.exports = router;
