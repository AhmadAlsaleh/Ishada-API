var express = require('express');
var router = express.Router();

const TestT = require('../models/test');

router.get('/', (req, res, next) => {
    new TestT({
        title : "Test",
        status : 1
    })
    .save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
});

module.exports = router;