var User = require("../models/user");
var jwt = require("jwt-simple");
var config = require("../config");

function createUserToken(user){
	var timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function(req, res, next){
	//res.send("Post is working")
	//TAKE IN REQUEST, GET & STORE INCOMING DATA FROM IT:
	var email = req.body.email;
	var password = req.body.password;

	if(!email || !password){
		return res.status(418).send({error: "You must provide your email and password."})
	}

	//CHECK IF USER WITH THAT EMAIL EXISTS
	User.findOne({email: email}, function(err, existingUser){
		if(err){ //HANDLES SEARCH ERROR
			return next(err); 
		} 
		if(existingUser){ //HANDLES EXISTING USERS
			 return res.status(418).send("Email is already in use.")
			//Alternative? return res.status(418).send(err); 
		}

		//CREATE A USER IF THAT EMAIL DOESN'T EXIST
		var user = new User({
			email: email,
			password: password
		});
		//SAVE THE RECORD TO THE DB:
		user.save(function(err){
			if(err){
				return next(err);
			}
			//SHOW RESPONSE TO USER
			res.json({token: createUserToken(user)});
			next();
		});
	});
}

exports.signin = function(req, res, next){
	res.send({token: createUserToken(req.user)});
}





