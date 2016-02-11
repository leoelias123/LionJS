var mongoose = require("mongoose"),
	Schema = mongoose.Schema;		
	
var EmployeeSchema = new Schema({
	FirstName: { type: String, required: true },
	LastName: { type: String, required: true },
	Salary: Number,
	Contact: require("./shared/contact")		
});

module.exports = mongoose.model("Employee", EmployeeSchema);