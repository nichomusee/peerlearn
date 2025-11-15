const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const noteRouter = require('./routes/Notes'); // ✅ fixed path

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend origin (allow all localhost ports during dev)
app.use(cors({
    origin: /^http:\/\/localhost/,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Parse incoming JSON
app.use(express.json());

// Base route for testing
app.get('/', (req, res) => res.send('Notes API is up and running...'));

// Mount notes routes
app.use('/api/notes', noteRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API is on http://localhost:${PORT}`));
