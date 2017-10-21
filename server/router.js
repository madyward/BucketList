//DECLARE VARIABLES
var Auth = require("./controllers/auth"); //Include authorization controller
var BucketList = require("./controllers/bucketlistcontroller");
var passportService  = require("./services/passport");
var passport = require("passport");

var requireAuth = passport.authenticate("jwt", {session: false});
var requireSignin = passport.authenticate("local", {session: false});

module.exports = function(app){ //Sets routes
	app.get("/", requireAuth, function(req, res){
		res.send({message: "Hey!"});
	});
	app.post("/signup", Auth.signup);
	app.post("/signin", requireSignin, Auth.signin);
	app.post("/newitem", requireAuth, BucketList.addBucketList);
	app.get("/items", requireAuth, BucketList.fetchBucketLists);
	app.delete("/items/:id", requireAuth, BucketList.deleteBucketList);
}