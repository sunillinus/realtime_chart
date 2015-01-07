var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var t = Date.now();
  req.db.collection('data').insert({ value: Math.floor(Math.random()*100), created_at: t }, function(err, result) {});
  // res.render('index', { title: 'Express' });
  req.db.collection('data').find().toArray(function(err, data) {
    console.log("Data: " + data.length);
    res.json(data);
  });
});

router.post('/', function(req, res) {
  var t = Date.now();
  req.db.collection('data').insert({ value: Math.floor(Math.random()*100), created_at: t }, function(err, result) {});
  // res.render('index', { title: 'Express' });
  req.db.collection('data').find({created_at: {$gt: (t - 600000)}}).sort({created_at:1}).toArray(function(err, data) {
    res.json(data);
  });
});

module.exports = router;
