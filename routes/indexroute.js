const express = require('express');
const path = require('path');
const router = express.Router();


// Route for the homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/LandingPage.html'));
});
// Route for the signup
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});
// Route for the login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
// Route for the ForgotPasswordPage
router.get('/ForgotPassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/ForgotPasswordPage.html'));
});
// Route for the verify_email
router.get('/verifyemail', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/verify_email.html'));
});
// Route for the Quiz
router.get('/Quiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Quiz.html'));
});
// Route for the AddQuiz
router.get('/AddQuiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/AddQuiz.html'));
});

module.exports = router;