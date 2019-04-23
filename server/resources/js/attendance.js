// The client side javascript functions for the attendance page
// The socket connection
let socket = io();
$(document).ready(() => {
    fetch("/class/get").then((data) =>{
        return data.json();
    }).then((data) => {
        // Now that it is in json we can process it
        for(const current of data){
            $("#currentclass").append(`<option value="${current.name}">${current.name}</option>`);
        }
        return fetch("/currentclass/get");
    })
    .then((data) => {return data.json();})
    .then((data) => {
        console.log(data);
        if(data.hasOwnProperty('name')){
            $("#currentclass").val(data.name);
        }
    })
    .catch((err) => console.log(err));
    $(".alert").hide();
});

// Whenever the button is clicked we want to relay that to the server
$("#changeclass").click(() => {
    var name = $("#currentclass").val();
    socket.emit("currentclass", $("#currentclass").val());
    $(".alert").show().html("<p>Now recording attendance for: " + name + "</p>");
    socket.emit("log", "Class Change - Recording attendance for: " + name);
});

socket.on("currentclass", (msg) => {
    $("#currentclass").val(msg);
});