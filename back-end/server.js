const express = require('express');
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/assignment-organizer', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
  
const assignmentSchema = new mongoose.Schema({
    associatedUser: String,
    assignment_id: String,
    name: String,
    className: String,
    dueDate: String,
    description: String
});

userSchema.set('toJson', {
    virtuals: true
});

assignmentSchema.set('toJson', {
    virtuals: true
});

const User = mongoose.model('User', userSchema);

const Assignment = mongoose.model('Assignment', assignmentSchema);

app.get('/api/user/', async (req, res) => {
   try {
       let users = await User.find();
       let curUser = users.find(element => element.username === req.body.username);
       if (curUser.password === req.body.password) {
           res.send({user: curUser.username});
       }
       else {
           res.sendStatus(401);
       }
   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }
});


app.post('/api/new-user', async (req, res) => {
    try {
        let users = await User.find();
        let curUser = users.find(element => element.username === req.body.username);
        if (curUser != undefined) {
            console.log("username taken");
            res.sendStatus(409);
        }
        else {
            const newUser = new User ({
                username: req.body.username,
                password: req.body.password
            });
            await newUser.save();
            res.send({user: newUser.username});
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/assignments/:user', async (req, res) => {
    try {
        let assignments = await Assignment.find();
        let curAssignments = assignments.find(element => element.associatedUser === req.params.user);
        res.send({assignments: curAssignments});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/new-assignment/:user', async (req, res) => {
    try {
        let newID = crypto.randomUUID();
        let newAssignment = new Assignment({
            associatedUser: req.params.user,
            assignment_id: newID,
            name: req.body.name,
            className: req.body.className,
            dueDate: req.body.dueDate,
            description: req.body.classDescription
        });
        await newAssignment.save();
        res.send({assignment: newAssignment});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/assignments/:user/:id', async(req, res) => {
    try {
        await Assignment.deleteOne({
            associatedUser: req.params.user,
            assignment_id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('api/assignments/:user/:id', async (req, res) => {
   try {
       let assignments = await Assignment.find();
       let assignment = assignments.find(element => element.assignment_id === req.params.id && element.associatedUser === req.params.user);
       if (assignment === undefined) {
           res.sendStatus(404);
       }
       else {
           if (req.body.name != "") {
               assignment.name = req.body.name;
           }
           if (req.body.className != "") {
               assignment.className = req.body.className;
           }
           if (req.body.dueDate != "") {
               assignment.dueDate = req.body.dueDate;
           }
           if (req.body.classDescription != "") {
               assignment.description = req.body.classDescription;
           }
           await assignment.save();
           res.send({assignment: assignment});
       }
   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));