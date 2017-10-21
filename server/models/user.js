var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var Schema =  mongoose.Schema;


//Create User Schema Object:
var userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},

	password: String
});

userSchema.pre("save", function(next){
	var user = this;

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	//This password is our hashed & salted password
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		//If there was an error, return callback w/ error...
		if(err){
			return callback(err);
		}
		//Otherwise, call the callback
		callback(null, isMatch);
	});
}

var model = mongoose.model("user", userSchema);

module.exports = model;