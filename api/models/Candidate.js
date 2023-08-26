const mongoose = require('mongoose');

const candidateschema = new mongoose.Schema({
    Name: String,
    Rollno: {type:Number, unique: true},
    Password: String,
    isAdmin: Boolean,
    Marks: Number,
    University: String
}, {timestamps: true});

const CandidateModel = mongoose.model('Candidate', candidateschema);
module.exports = CandidateModel;