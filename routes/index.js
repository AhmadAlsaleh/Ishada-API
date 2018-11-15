var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Ishada API // Crazy ITer' });
});

router.get('/hi', (req, res, next) => {
  res.json({"hi" : "Hello World :)"});
});

router.get('/about', (req, res, next) => {
  res.json({"message" : "developed by Crazy ITer ;-)"});
});

module.exports = router;
