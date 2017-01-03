var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/users', function(req, res, next) {
	var user = new User();
	user.username = req.body.username;
	user.setPassword(req.body.password);

	user.save(function(err) {
		if (err) return next(err);
	});
});

router.get('/users', function(req, res) {
	User.find(function(err, users) {
		res.json(users);
	});
});

router.post('/login', function(req, res) {
	User.findOne({username: req.body.username}, function(err, user) {
		if (err) return err;
		if (!user) {
			return res.json("user not found");
		}
		if (!user.validPassword("nate")) {
			return res.json("incorrect password");
		}
		return res.json(user);
		
	});
});

module.exports = router;