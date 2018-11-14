var express = require('express');
var router = express.Router();
var connectionURL = require('../models/global').connectionString;
var mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  mongoose.connect(connectionURL, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      res.status(400).json({
        "connection error" : err.message
      });
      return;
    }
    var userColl = db.collection('users');
    userColl.find({}, {}).toArray((err, users) => {
      if (err) {
        res.status(400).json({
          "message" : "Error"
        });
        return;
      }
      res.status(200).send(users);
    });
  });
});

router.post('/signUp', (req, res, next) => {
  mongoose.connect(connectionURL, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      res.status(400).json({
        "connection error" : err.message
      });
      return;
    }
    var userColl = db.collection('users');
    userColl.find({}, {}).toArray((err, users) => {
      if (err) {
        res.status(400).json({
          "message" : "Error"
        });
        return;
      }
      if (users.length > 0) {
        res.status(200).json({
          "message" : "Already registered!"
        });
        return;
      }

      userColl.insertOne({
        fullName : req.body.fullName,
        username : req.body.username,
        password : req.body.password,
        email  : req.body.email,
        phone : req.body.phone,
        departmentID : req.body.departmentID
      }, (err, result) => {
        if (err) { 
          res.status(400).json({
            "message" : err.message
          });
        } else {
          res.json({
            "message" : "Welcome " + req.body.fullName
          });
        }
      });

    });    

  });
});

router.post('/signIn', (req, res, next) => {
  mongoose.connect(connectionURL, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      res.status(400).json({
        "connection error" : err.message
      });
      return;
    }

    var userColl = db.collection('users');
    userColl.find({ username : req.body.username, password : req.body.password })
      .toArray((err, users) => {
      if (err) {
        res.status(400).json({
          "message" : err.message
        });
        return;
      }
      if (users.length == 0) {
        res.json({
          "message" : "Not Registered!"
        });
        return;
      }
      res.send(users[0]);
    });

  });
});

module.exports = router;
