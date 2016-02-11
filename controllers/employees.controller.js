module.exports = function (apiRoutes, Employee) {
	
	require("../routes/employee.route")(apiRoutes, AddEmployee);
	
	// POST
	function AddEmployee(request, response) {	
		// if(!request.body.username || !request.body.password)
		// 	response.json({success: false, msg: "Please pass name and password."});	
		// else {		
			var newEmployee = new Employee({
				FirstName: request.body.FirstName,
				LastName: request.body.LastName,
				Salary: request.body.Salary,
				Contact: {
					FullAddress: request.body.Contact.FullAddress,
					Street: request.body.Contact.Street,					
					Area: request.body.Contact.Area,
					City: request.body.Contact.City,
					State: request.body.Contact.State,
					PostalCode: request.body.Contact.PostalCode,	
					Phone1: request.body.Contact.Phone1,
					Phone2: request.body.Contact.Phone2,
					Phone3: request.body.Contact.Phone3,
					Email1: request.body.Contact.Email1,
					Email2: request.body.Contact.Email2,
					Email3: request.body.Contact.Email3
				}
			});
			
			newEmployee.save(function(err) {
				if (err)
					response.json({success: false, msg: "Error at try add new employee. " + err});
				else
					response.json({success: true, msg: "Successful created user."})
			});
		//};
	};		
};