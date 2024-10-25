const express = require('express');
const router = express.Router();

const { getUserByEmail } = require('../controllers/authController');
const {
	addStudent,
	getAllStudents,
	deleteStudent,
	editStudent
} = require('../controllers/dataController');

/* POST ROUTES */
router.post('/addstudent', addStudent);

/* GET ROUTES */
router.get('/user/:email', getUserByEmail);
router.get('/getstudents', getAllStudents);

/* PUT ROUTES */
router.put('/getstudents/:id', editStudent);

/* DELETE ROUTES */
router.delete('/getstudents/:id', deleteStudent);

module.exports = router;
