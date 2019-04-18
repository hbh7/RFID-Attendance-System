const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
//const http = require('http').createServer(app)
//const io = require('socket.io')(http)

const port = 3000;

// Security
const fs = require('fs');
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

mongoose.connect("mongodb+srv://admin:<password>@rfid-attendance-4ynzt.mongodb.net/test?retryWrites=true", {useNewUrlParser: true})
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
io.on("connection", (client) => {
    console.log("We got a client");
    client.on("disconnect", () => {
        io.emit('disconnect', "User lost!");
    });
    client.on("attend", (msg) => {
        console.log(msg);
        console.log("Message received!");
        io.emit("received", "Text: " + msg.text + " ID: " + msg.ID);
    });
});
https.listen(port,"0.0.0.0", () => {
    console.log("Server started on port: " + port);
});