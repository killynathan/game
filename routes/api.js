var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/users', function(req, res, next) {
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;

	user.save(function(err) {
		if (err) return next(err);
	});
});

router.get('/users', function(req, res) {
	User.find(function(err, users) {
		res.json(users);
	});
});

module.exports = router;