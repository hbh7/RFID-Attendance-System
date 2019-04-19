const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./schemas/User');
const Attendance = require('./schemas/Attendance');
const Class = require('./schemas/Class');
const UserFunctions = require('./UserFunctions');
const app = express();
//const http = require('http').createServer(app)
//const io = require('socket.io')(http)

const port = 3000;
let currentClass = new Class();
// Security
const fs = require('fs');
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

mongoose.connect("mongodb+srv://admin:admin@rfid-attendance-4ynzt.mongodb.net/iotproject?retryWrites=true", {useNewUrlParser: true, useCreateIndex: true,})
.catch((err) =>{
    console.error(err);
    return;
});
mongoose.Promise = global.Promise;

const https = require('https').createServer(options, app);

const io = require('socket.io')(https)

// This parses all the responses to JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// allows us to access files in the resources folder
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/createclass', (req, res) => {
    res.sendFile(path.join(__dirname, 'createclass.html'));
})

app.get('/attendance', (req, res) => {
    res.sendFile(path.join(__dirname, 'changeclass.html'));
})

// Gets the current class attendance is being taken for
app.get('/currentclass/get', (req, res) => {
    res.send(currentClass);
});

// Returns a list of classes
app.get('/class/get', (req, res) => {
    Class.find({}, (err, classes) => {
        if(err){
            res.send("ERROR");
        }else{
            res.send(classes);
        }
    });
});

app.post('/class/create', (req, res) => {
    console.log(req.body);
    if(req.body['name'] != null){
        const new_class = new Class({name: req.body.name, attendants: []});
        Class.findOne({name: req.body.name}).then((class_found) =>{
            if(class_found == null){
                return new_class.save();
            }else{
                res.send(class_found);
            }
        })
        .then((newc) =>{
            res.send(newc);
        })
        .catch((err) => {
            console.error(err);
        })
    }else{
        res.send("Bad request!");
    }
});

io.on("connection", (client) => {
    console.log("We got a client");
    client.on("disconnect", () => {
        io.emit('disconnect', "User lost!");
    });
    client.on("attend", (msg) => {
        io.emit("response", msg.ID);
        io.emit("received", " ID: " + msg.ID);
        // We will find a user and if one doesn't exist we will create one
        const usr = UserFunctions.findAndCreate(msg.ID);
        // If someone has selected a class to record attendance for
        if (currentClass != null){
            usr.then((attending_user) => {
                const current_attendant = new Attendance({class: currentClass, date: Date.now(), user: attending_user});
                return current_attendant.save();
            }).catch((err) => console.log(err));
        }
    });
    // This handles what class attendance is currently being taken for
    client.on("currentclass", (current_class) => {
        Class.findOne({name: current_class}, (err, found) => {
            if(err) { console.error(err); }
            if(found != null){
                currentClass = found;
                io.emit("currentclass", current_class);
            }
        });
    });
});
https.listen(port,"0.0.0.0", () => {
    console.log("Server started on port: " + port);
});