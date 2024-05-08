const express = require('express');
const path = require('path');
const router = express.Router();
const { Admin, Student, Teacher,Quiz} = require('../models/User');




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
// Route for the Quiz
router.get('/Quiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Quiz.html'));
});
// Route for the AddQuiz
router.get('/AddQuiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/AddQuiz.html'));
});
// Route for the studentdashboard
router.get('/StudentDashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/StudentDashboard.html'));
});
// Route for the adddashboard
router.get('/AdminDashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/AdminDashboard.html'));
});
// Route for the teachdashboard
router.get('/TeacherDashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/TeacherDashboard.html'));
});


router.post('/addQuiz', async (req, res) => {
    try {
        const questions = [];
        for (let i = 1; i <= 10; i++) {
            const { [`question${i}`]: questionText, [`q${i}a`]: optionA, [`q${i}b`]: optionB, [`q${i}c`]: optionC, [`q${i}d`]: optionD, [`correctOption${i}`]: correctOption } = req.body;
            questions.push({
                questionText,
                options: {
                    optionA,
                    optionB,
                    optionC,
                    optionD
                },
                correctOption
            });
        }
        await Quiz.insertMany(questions);
        console.log('Quiz questions saved successfully:', questions);
        res.send('Quiz questions saved successfully!');
    } catch (error) {
        console.error('Error saving quiz questions:', error);
        res.status(500).send('Error saving quiz questions');
    }
});


router.get('/CRUDstd', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/CRUDstd.html'));
});

router.get('/CRUDteacher', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/CRUDteacher.html'));
});


//CRUD OPERATIONS FOR STUDENT 
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching students');
    }
});

// Route to handle fetching a student by username
router.get('/students/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const student = await Student.findOne({ username });
        if (!student) {
            res.status(404).send('Student not found');
            return;
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching student');
    }
});

// Route to handle updating a student
router.put('/students/:username', async (req, res) => {
    try {
        const { fullname, email, password, birthdate } = req.body;
        const currentStudent = await Student.findOne({ username: req.params.username });

        // Construct the updated student object
        const updatedStudent = {
            fullname: fullname || currentStudent.fullname,
            email: email || currentStudent.email,
            password: password || currentStudent.password,
            birthdate: birthdate ? new Date(birthdate) : currentStudent.birthdate,
        };

        await Student.findOneAndUpdate({ username: req.params.username }, updatedStudent);
        res.status(200).send('Student updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating student');
    }
});

// Route to handle creating a student
router.post('/students', async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { fullname, username, email, password, birthdate } = req.body;
        const student = new Student({ fullname, username, email, password, birthdate });
        await student.save();
        console.log('Student created successfully');
        res.status(201).send('Student created successfully');
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).send('Error creating student');
    }
});

// Route to handle deleting a student
router.delete('/students/:username', async (req, res) => {
    try {
        await Student.findOneAndDelete({ username: req.params.username });
        res.status(200).send('Student deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting student');
    }
});
//--------------------------------------------------------

// CRUD operations for teachers

// Route to fetch all teachers
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching teachers');
    }
});

// Route to fetch a teacher by username
router.get('/teachers/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const teacher = await Teacher.findOne({ username });
        if (!teacher) {
            res.status(404).send('Teacher not found');
            return;
        }
        res.json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching teacher');
    }
});

// Route to update a teacher
router.put('/teachers/:username', async (req, res) => {
    try {
        const { fullname, email, password, birthdate } = req.body;
        const currentTeacher = await Teacher.findOne({ username: req.params.username });

        // Construct the updated teacher object
        const updatedTeacher = {
            fullname: fullname || currentTeacher.fullname,
            email: email || currentTeacher.email,
            password: password || currentTeacher.password,
            birthdate: birthdate ? new Date(birthdate) : currentTeacher.birthdate,
        };

        await Teacher.findOneAndUpdate({ username: req.params.username }, updatedTeacher);
        res.status(200).send('Teacher updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating teacher');
    }
});

// Route to create a teacher
router.post('/teachers', async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { fullname, username, email, password, birthdate } = req.body;
        const teacher = new Teacher({ fullname, username, email, password, birthdate });
        await teacher.save();
        console.log('Teacher created successfully');
        res.status(201).send('Teacher created successfully');
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).send('Error creating teacher');
    }
});

// Route to delete a teacher
router.delete('/teachers/:username', async (req, res) => {
    try {
        await Teacher.findOneAndDelete({ username: req.params.username });
        res.status(200).send('Teacher deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting teacher');
    }
});

module.exports = router;