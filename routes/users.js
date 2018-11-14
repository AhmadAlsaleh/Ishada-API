var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).json({
        "message" : "Error"
      });
      return;
    }
    res.status(200).send(users);
  });
});

router.post('/signUp', (req, res, next) => {

  User.find({ username : req.body.username }, (err, data) => {
    if (err) {
      res.status(400).send({
        "message" : err.message
      });
      return;
    }
    if (data != 0) {
      res.send({
        "message" : "Already registered!"
      });
      return;
    }

    new User({
      fullName : req.body.fullName,
      username : req.body.username,
      password : req.body.password,
      email  : req.body.email,
      phone : req.body.phone,
      departmentID : req.body.departmentID
    })
    .save()
    .then(result => {
      res.json({
        message : "Welcome " + result.fullName,
      });
    })
    .catch(err => {
      res.json({
        message : err.message
      });
    });


  });
});

router.post('/signIn', (req, res, next) => {
  User.find({ username : req.body.username , password : req.body.password }, (err, user) => {
    if (err) {
      res.status(400).json({
        "message" : err.message
      });
      return
    }
    if (user.length == 0) {
      User.find({ username : req.body.username }, (err, user) => {
        if (user.length == 0) {
          res.json({
            "message" : "Not Registered!"
          });
        } else {
          res.json({
            "message" : "Incorrect Password"
          });
        }
      });
    } else {
      res.json(user[0]);
    }
  });
});

module.exports = router;
