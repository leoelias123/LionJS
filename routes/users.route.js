module.exports = function (apiRoutes, SignUp, SignIn) {	
	apiRoutes.post("/signup", SignUp);
	apiRoutes.post("/signin", SignIn); 
};