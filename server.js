/* Dependencies */
var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	passport = require("passport"),
	jwt = require("jwt-simple"),	
	config = require("./config/database"),	
	User = require("./models/auth/users"),
	Employee = require("./models/employees"),
	apiRoutes = express.Router(),
	server = express(),
	port = 3000;

mongoose.connect(config.database, function (error, response) {
	if (error) 
		console.log("Error al conectar con la base de datos" + error);
	else 
		console.log("Conectado con la base de datos");
});

/* Get our request parameters */
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

/* Log to console */
server.use(morgan("dev"));

/* Use the passport package in our application */
server.use(passport.initialize());

/* Principal method */
server.get("/", function (request, response){
	response.send("Welcome to the LionJS api");
});

/* Set principal path for api routes */
server.use("/api", apiRoutes);

/* Start server */
server.listen(port);
console.log("Conectado a http://localhost:" + port + "/");

require("./config/passport")(passport);

/* Controllers */
require("./controllers/auth/users.controller")(apiRoutes, User, jwt, config);
require("./controllers/employees.controller")(apiRoutes, Employee);