const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); //to able to access .env file content

const mongoURL = process.env.MONGO_URI;

// Import Routes
const apiRoutes = require('./routes/routes');

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use('/', apiRoutes);

app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(mongoURL)
	.then(() => {
		console.log('Connected to MongoDB');
		// console.log('Checking Connection Name>>>', mongoose.connection.name); // Logs the connected DB name
		// console.log('Checking Collection>>>', mongoose.connection.collections); // Lists all collections
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
	});

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to the School Management System API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
