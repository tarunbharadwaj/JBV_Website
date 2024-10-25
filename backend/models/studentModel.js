const mongoose = require('mongoose');

// Define the schema for the student data
const StudentSchema = new mongoose.Schema(
	{
		name: String,
		motherName: String,
		fatherName: String,
		address: String
	},
	{ collection: 'StudentsList' }  // Explicitly define the collection name
);

// Export the model, specifying the database name and schema
const Student = mongoose.connection
	.useDb('JBVSTUDENTS')
	.model('Student', StudentSchema);
module.exports = Student;
