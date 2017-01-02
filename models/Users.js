var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: String
});

mongoose.model('User', UserSchema);