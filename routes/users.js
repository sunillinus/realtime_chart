var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  req.db.collection('users').find().toArray(function(err, users) {
    console.log("Users: " + users);
    res.json(users);
  });
});

/*
 * POST to adduser.
 */
router.post('/', function(req, res) {
    req.db.collection('users').insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;
