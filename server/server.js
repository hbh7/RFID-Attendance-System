const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const http = require('http').createServer(app)
//const io = require('socket.io')(http)

const port = 3000;

// Security
var fs = require('fs');
var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

var https = require('https').createServer(options, app);

const io = require('socket.io')(https)
//


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
        console.log("Message received!");
        console.log(msg);
        io.emit("response", msg.ID);
        io.emit("received", " ID: " + msg.ID);
    });
});
https.listen(port,"0.0.0.0", () => {
    console.log("Server started on port: " + port);
});