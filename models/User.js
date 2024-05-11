const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    userType: { type: String, enum: ['admin'], required: true, default: 'admin' } // Default to 'admin' for admin users
});

const studentSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    userType: { type: String, enum: ['student'], required: true, default: 'student' } // Default to 'student' for student users
});

const teacherSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    userType: { type: String, enum: ['teacher'], required: true, default: 'teacher' } // Default to 'teacher' for teacher users
});

const quizSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: {
            optionA: String,
            optionB: String,
            optionC: String,
            optionD: String
        },
        required: true
    },
    correctOption: {
        type: String,
        enum: ['optionA', 'optionB', 'optionC', 'optionD'],
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Admin, Student, Teacher, Quiz };
