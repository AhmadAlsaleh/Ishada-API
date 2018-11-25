var express = require('express');
var router = express.Router();

var Meeting = require('../models/meeting');

router.get('/', (req, res, next) => {
    Meeting.find((err, data) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }

        res.send(data);

    });
});

router.get('/:id', (req, res, next) => {
    Meeting.findById( req.params.id , (err, data) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }

        res.send(data);

    });
});

router.post('/newMeeting', (req, res, next) => {
    new Meeting(req.body)
    .save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(400).json({
            "message" : err
        });
    });
});

router.post('/editMeeting', (req, res, next) => {
    Meeting.findByIdAndUpdate( req.body.id, req.body, (err, data) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }

        res.send(data);

    });
});

router.delete('/deleteMeeting/:id', (req, res, next) => {
    Meeting.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(400).json({
                "message" : err.message
            });
            return;
        }

        res.send(data);

    });

});

module.exports = router;