// The client side javascript for viewattendance
$(document).ready(()=>{
    fetch("/class/get").then((data) =>{
        return data.json();
    }).then((data) => {
        // Now that it is in json we can process it
        for(const current of data){
            $("#class").append(`<option value="${current.name}">${current.name}</option>`);
        }
        return fetch("/currentclass/get");
    })
});

$("#view-attendance").click(() => {
    const start = $("#begin-time").val();
    const end = $("#end-time").val();
    const selected_class = $("#class").val();
    if (start > end){
        alert("Start time must be before end time!");
        return;
    }
    const url = `/attendance?start=${start}&end=${end}&class=${selected_class}`
    fetch(encodeURI(url)).then((res) => {
        return res.json();
    })
    .then((data) => {
        $("#info").html(constructTable(data));
    })
    .catch((err) => console.log(err));
});

function constructTable(data){
    console.log(data);
    let found = {};
    data = data.filter((entry) => {
        if(found[entry.user.cardID]){
            return false;
        }
        found[entry.user.cardID] = true;
        return true;
    });
    console.log(data);
    let table = 
    `<table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">RIN</th>
      </tr>
    </thead>
    <tbody>`;
    if(data.length == 0){
        return "No users have attendanded during this time period :(";
    }
    for(const attendant of data) {
        table += '<tr>'
        if (attendant.user.name == ""){
            table += "<td>Unenrolled User</td>";
        }else{
            table += "<td>" + attendant.user.name + "</td>";
        }
        if (attendant.user.rin == null){
            table += "<td>Unenrolled User</td>";
        }else{
            table += "<td>" + attendant.user.rin + "</td>";
        }
        table += "</tr>"
    }
    table += "</tbody></table>";
    return table;
}