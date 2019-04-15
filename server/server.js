const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 3000;

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
http.listen(port, () => {
    console.log("Server started on port: " + port);
});