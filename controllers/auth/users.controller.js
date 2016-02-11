module.exports = function (apiRoutes, User, jwt, config) {
	
	require("../../routes/users.route")(apiRoutes, SignUp, SingIn);
	
	// POST
	function SignUp(request, response) {	
		if(!request.body.username || !request.body.password)
			response.json({success: false, msg: "Please pass name and password."});	
		else {		
			var newUser = new User({
				username: request.body.username,
				password: request.body.password,
				isSuperadmin: request.body.isSuperadmin ? request.body.isSuperadmin : false,
				isAdmin: request.body.isAdmin ? request.body.isAdmin : false,
				isEmployee: request.body.isEmployee ? request.body.isEmployee : false
			});
			
			newUser.save(function(err) {
				if (err)
					response.json({success: false, msg: "Username already exist."});
				else
					response.json({success: true, msg: "Successful created user."})
			});
		};
	};		
		
	// POST
	function SingIn(request, response) {	
		User.findOne({ username: request.body.username }, function(err, user) {
			if (err) throw err;			
			if (!user)
				return response.status(403).send({success: false, msg: "Authentication failed. User not found."});
			else
				user.comparePassword(request.body.password, function(err, isMatch) {
					if (isMatch && !err) {
						var token = jwt.encode(user, config.secret);
						response.json({
							success: true, 
							token: "JWT " + token, 
							superadmin: user.isSuperadmin, 
							admin: user.isAdmin, 
							employee: user.isEmployee
						});
					}
					else
						return response.status(403).send({success: false, msg: "Authentication failed. Worng password."});
				});		
		});	
	};
};