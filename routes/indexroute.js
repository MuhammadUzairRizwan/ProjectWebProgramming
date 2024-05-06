const express = require('express');
const path = require('path');
const router = express.Router();
const { Admin, Student, Teacher } = require('../models/User');




// Route for the homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/LandingPage.html'));
});
// Route for the signup
// GET request to render the signup form
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// POST request to handle form submission and create user
router.post('/signup', async (req, res) => {
    const { fullname, username, email, password, birthdate, user } = req.body;
    
    try {
        let userModel;
        switch (user) {
            case 'admin':
                userModel = Admin;
                break;
            case 'student':
                userModel = Student;
                break;
            case 'teacher':
                userModel = Teacher;
                break;
            default:
                return res.status(400).json({ message: 'Invalid user type' });
        }
        
        const newUser = new userModel({
            fullname,
            username,
            email,
            password,
            birthdate
        });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for the login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username exists in any of the user types
        const admin = await Admin.findOne({ username, password });
        const student = await Student.findOne({ username, password });
        const teacher = await Teacher.findOne({ username, password });

        // If user exists in any type, send success response
        if (admin || student || teacher) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect username or password' });
            res.redirect('/login');

        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route for the ForgotPasswordPage
router.get('/ForgotPassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/ForgotPasswordPage.html'));
});
// Route for the verify_email
router.get('/verifyemail', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/verify_email.html'));
});

module.exports = router;