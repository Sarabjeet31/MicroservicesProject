const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express()
const port = 8001

const jwtSecret = "microservices";

dotenv.config();
mongoose.connect(process.env.MONGO_URL);



app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:8000" || "http://localhost:8002"
}));
app.use(express.json());




app.post('/api/check',(req,res) => {
    const {token} = req.body;
    jwt.verify(token,jwtSecret,async (err,authdata) => {
        if(err) throw err;
        const userId = authdata.userId;
        const foundUser = await User.findOne({_id:userId});
        const username = foundUser.username;
        const isAdmin = foundUser.isAdmin;
        res.json({
            username: username,
            isAdmin: isAdmin
        })
    })
})

app.post('/api/signup', async (req, res) => {
    const {username,password} = req.body;
    try {
        const createdUser = await User.create({
            username,
            password,
            isAdmin: false
        });
        jwt.sign({userId:createdUser._id}, jwtSecret, {}, (err, token) => {
            if(err) throw err;
            res.status(201).json({
                token: token,
            });
        })
        
    } catch(err) {
        if(err) throw err;
    }
})

app.post('/api/signin', async (req, res) => {
    const { username, password } = req.body;
    try{
        const foundUser = await User.findOne({username})
        if(foundUser){
            const passOK = password === foundUser.password ? true : false;
            if(passOK){
                jwt.sign({ userId: foundUser._id}, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token:token
                    });
                    
                });
            }
        }
    }catch(err) {
        if(err) throw err;
    }

})

app.post('/auth',async (req, res) => {
    const {username} = req.body;
    const foundUser = await User.findOne({username});
    if(foundUser) {
        const isValid = foundUser ? true : false;
        const userType = foundUser.isAdmin === true ? 'admin' : 'user';
        return res.json({
            isValid: isValid,
            userType: userType
        })
    }
    res.json({
        isValid: false,
        userType: undefined
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
