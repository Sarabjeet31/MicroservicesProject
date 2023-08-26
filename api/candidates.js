const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Candidate = require('./models/Candidate');
const cors = require('cors');

const app = express()
const port = 8002;
let userType1;

dotenv.config();
mongoose.connect(process.env.MONGO_URL1);
app.use(bodyParser.json());
app.use(cors());

function UserAndAdmin(req, res, next) {
    const {username} = req.query;
    fetch("http://localhost:8001/auth",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        const {isValid,userType} = data;
        if(isValid){
            userType1=userType;
            next();
        } else {
            res.status(401).json("Unauthorised");
        }
    })
}


function AdminOnly(req,res,next) {
    const {Yourusername} = req.body;
    fetch("http://localhost:8001/auth",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: Yourusername
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        const {isValid,userType} = data;
        if(isValid && userType === "admin"){
            next();
        } else {
            res.status(401).json("Unauthorised");
        }
    })
}


app.get('/candidates',UserAndAdmin,async (req, res) => {;
    try {
        const CandidateData = userType1 === 'admin'? await Candidate.find() : await Candidate.find({},{marks:false,isAdmin:false,createdAt:false,updatedAt:false,__v:false});
        res.json(CandidateData);
    } catch(err) {
        if(err) throw err;
    }
})


app.post('/candidates',AdminOnly,async (req, res) => {
    const {
        Name,
        Rollno,
        Password,
        isAdmin,
        Marks,
        University
    } = req.body;
    try {
        await Candidate.create({
            Name: Name,
            Rollno: Rollno,
            Password: Password,
            isAdmin: isAdmin,
            Marks: Marks,
            University: University
        })
        res.status(201).json("User Created")
    } catch (err) {
        if (err) throw err;
    }
})

app.put('/candidates',AdminOnly,async (req, res) => {
    const {Name,field,value} = req.body;
    try {
        const update = await Candidate.updateOne({Name:Name},{$set:{Marks:value}});
        if(update.modifiedCount!=0){
            res.json("User Modified");
        } else{
            res.json("User Not Modified");
        }
    } catch (err) {
        if (err) throw err;
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})