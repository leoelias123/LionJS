var JwtStrategy = require("passport-jwt").Strategy,
	User = require("../models/auth/users"),
	config = require("../config/database");
	
module.exports = function (passport) {
	var opt = {};
	opt.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opt, function (jwt_payload, done) {
		User.find({id: jwt_payload.id}, function (err, user){
			if (err)
				return done(err, false);
			if (user)
				done(null, user);
			else
				done(null, false);
		});
	}));
};