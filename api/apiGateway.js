const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = 8000


app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));






app.post("/api/users/check", (req,res) => {
    const {token} = req.body;
    fetch("http://localhost:8001/api/check",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            token: token
        }),
        credentials:"include"
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        res.send(data);
    })
})

app.post('/api/users/signup', (req, res) => {
    const {username, password} = req.body;
    fetch("http://localhost:8001/api/signup",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        credentials:"include"
    }).then( (resp) => {
        return resp.json();
    }).then((data) => {
        const {token,id} = data
        res.cookie("token", token, {sameSite:'none', secure:true}).status(201)
    })
})

app.post('/api/users/signin',(req, res) => {
    const {username,password} = req.body;
    fetch("http://localhost:8001/api/signin",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        const {token} = data
        res.cookie("token", token, {sameSite:'none', secure:true}).status(200).json("User signed in")
    })
})

app.get('/api/candidates',(req, res) => {
    fetch(`http://localhost:8002/candidates?username=${req.query.username}`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        res.json(data);
    })
})

app.post('/api/candidates',(req, res) => {
    const {
        Name,
        Rollno,
        Password,
        isAdmin,
        Marks,
        University
    } = req.body;
    fetch("http://localhost:8002/candidates",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: Name,
            Rollno: Rollno,
            Password: Password,
            isAdmin: isAdmin,
            Marks: Marks,
            University: University
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        res.json(data);
    })
})

app.put('/api/candidates',(req, res) => {
    const {YourUsername, Name, value} = req.body;
    fetch("http://localhost:8002/candidates",{
        method:"PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            YourUsername: YourUsername,
            Name:Name,
            value:value
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        res.json(data);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})