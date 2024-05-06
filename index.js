const express = require('express');
const mongoose = require('mongoose');
const indexRoute = require('./routes/indexRoute');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/Examify'; // Your MongoDB URI with database name
const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
