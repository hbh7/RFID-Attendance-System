$(document).ready(() => {
    $(".alertsuccess").hide();
    $(".alertfail").hide();
});

$("#create").click(() => {
    if ($("#classname").val() == ""){
        $(".alertsuccess").hide();
        $(".alertfail").show().html("Please enter a name!");
        return;
    }
    let formData = {
        name: $("#classname").val()
    };
    $(".alertfail").hide();
    $(".alertsuccess").show().html("Successfully created the class/event "+$("#classname").val()+".");
    fetch("/class/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
    
    .catch((err) => console.log(err));
});
