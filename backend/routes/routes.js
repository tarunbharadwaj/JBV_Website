const express = require('express');
const router = express.Router();

const { getUserByEmail } = require('../controllers/authController');
const {
	addStudent,
	getAllStudents,
	deleteStudent,
	editStudent,
	searchStudent,
	addTeacher,
	getAllTeachers,
	editTeacher
} = require('../controllers/dataController');

/* POST ROUTES */
router.post('/addstudent', addStudent);
router.post('/addteacher', addTeacher);

/* GET ROUTES */
router.get('/user/:email', getUserByEmail);
router.get('/getstudents', getAllStudents);
router.get('/searchstudent', searchStudent);
router.get('/getteachers', getAllTeachers);

/* PUT ROUTES */
router.put('/getstudents/:id', editStudent);
router.put('/getteachers/:id', editTeacher);

/* DELETE ROUTES */
router.delete('/getstudents/:id', deleteStudent);

module.exports = router;
