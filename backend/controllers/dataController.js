const Student = require('../models/studentModel');

// Controller to add a new student
exports.addStudent = async (req, res) => {
	try {
		const newStudent = new Student(req.body);
		const savedStudent = await newStudent.save();
		res.status(201).json(savedStudent);
	} catch (error) {
		res.status(400).json({ message: 'Error adding student', error: err.message });
	}
};

// Controller to get all students
exports.getAllStudents = async (req, res) => {
	try {
		const students = await Student.find();
		res.status(200).json(students);
	} catch (err) {
		res
			.status(400)
			.json({ message: 'Error fetching students', error: err.message });
	}
};

exports.deleteStudent = async (req, res) => {
	try {
		const { id } = req.params;
		await Student.findByIdAndDelete(id);
		res.status(200).json({ message: 'Student deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete student' });
	}
};

exports.editStudent = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		const student = await Student.findByIdAndUpdate(id, updatedData, {
			new: true
		});
		res.status(200).json(student);
	} catch (error) {
		res.status(500).json({ error: 'Failed to update student' });
	}
};

exports.searchStudent = async (req, res) => {
	const { query } = req.query;
	const students = await Student.find({
		name: { $regex: query, $options: 'i' }
	});
	/* const teachers = await Teacher.find({
		name: { $regex: query, $options: 'i' }
	}); */
	const results = [...students];
	res.json(results);
};
