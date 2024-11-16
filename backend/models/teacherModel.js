const mongoose = require('mongoose');

// Define the schema for the student data
const TeacherSchema = new mongoose.Schema(
	{
		name: String,
		phoneNumber: Number,
		address: String
	},
	{ collection: 'TeachersList' } // Explicitly define the collection name
);

// Export the model, specifying the database name and schema
const Teacher = mongoose.connection
	.useDb('JBVTEACHERS')
	.model('Teacher', TeacherSchema);

module.exports = Teacher;
