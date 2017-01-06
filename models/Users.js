var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	hash: String,
	salt: String,
	level: {type: Number, default: 1},
	exp: {type: Number, default: 0},
	energy: {type: Number, default: 100},
	reputation: {type: Number, default: 0},
	gold: {type: Number, default: 0},
	agility: {type: Number, default: 0},
	strength: {type: Number, default: 0},
	intelligence: {type: Number, default: 0},
	power: {type: Number, default: 0},
	wins: {type: Number, default: 0},
	losses: {type: Number, default: 0},
	rank: {type: Number, default: 0},
	battles: {type: Number, default: 0},
	body: {type: Number, default: 0},
	legs: {type: Number, default: 0},
	feet: {type: Number, default: 0},
	hands: {type: Number, default: 0},
	head: {type: Number, default: 0},
	inventory: [{type: Number, default: 0}],
	combatstats: {
		hp: {type: Number, default: 100},
		agility: {type: Number, default: 1},
		strength: {type: Number, default: 1},
		intelligence: {type: Number, default: 1},
		power: {type: Number, default: 1}
	}
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

mongoose.model('User', UserSchema);