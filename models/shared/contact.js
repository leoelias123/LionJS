var ContactSchema = {
	FullAddress: { type: String, required: true },
	Street: { type: String, required: true },
	Area: { type: String, required: true },
	City: { type: String, required: true },
	State: { type: String, required: true },
	PostalCode: { type: String, required: true },	
	Phone1: { type: String, required: true },
	Phone2: { type: String },
	Phone3: { type: String },
	Email1: { type: String, required: true },
	Email2: { type: String },
	Email3: { type: String }
}

module.exports = ContactSchema