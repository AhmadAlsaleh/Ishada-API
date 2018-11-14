var express = require('express');
var router = express.Router();
var base64Img = require('base64-img');

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Ishada API // Crazy ITer' });
});

router.get('/hi', (req, res, next) => {
  res.json({"hi" : "Hello World :)"});
});

module.exports = router;
