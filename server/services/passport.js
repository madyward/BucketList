//DECLARE VARIABLES & SET UP INSTANCES
var passport =  require("passport");
var User = require("../models/user");
var config = require("../config");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var LocalStrategy = require("passport-local");

//CREATE LOCAL STRATEGY - AUTHENTICATES USER:
var localOptions = {usernameField: "email"};
var localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({email: email}, function(err, user){	
		if(err){ //If there's an error in search, return early w/ error object
			return done(err);
		}
		if(!user){ //If there's not an error, just no found user
			return done(null, false);
		}
		//Compare passwords from req w/ users saved password. Does "password" = user.password?
		user.comparePassword(password, function(err, isMatch){
			if(err){ //If there's an error, return early
				return done(err);
			}
			if(!isMatch){ //If it's not the same, it'll return false & say they didn't match up
				return done(null, false);
			}
			return done(null, user); //If the same, it'll call passport callback w/ user model
		});
		//Tricky part - password is salted, & needs to somehow be decoded back to normal password
	});
	//Otherwise, call done w/ false
});

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: config.secret
};

//CREATE JWT STRATEGY - VERIFIES TOKEN/ID RELATION:
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){ //On payload, we have sub property.
											//Use User model, look through all users, & find user with ID
	User.findById(payload.sub, function(err, user){ //findById's 1st arguement, err, will be populated only 
		if(err){																		//if search fails
			return done(err, false);
		}
		if(user){ //If user with ID is found, pass it to the done callback. User is authenticated!
			done(null, user);
		} else {
			done(null, false); //If no user with ID is found, done callback is called w/o user object
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);