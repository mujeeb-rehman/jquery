$(document).ready(function(){
    let ipAddress = $("#ipInput");
    let ipError = $("#ipError");
    let addIpBtn = $("#addIpBtn");
    let tableBody = $("tbody").first();
    let search = $("#searchInput");


    ipAddress.on("keyup", function(){
        let ip = $(this).val();
        if(validateIp(ip)){
            addIpBtn.removeClass("disabled");
            ipError.text("IP is valid :)");
            ipError.removeClass("text-danger");
            ipError.addClass("text-success");
        } else {
            addIpBtn.addClass("disabled");
            ipError.text("Invalid IP!");
            ipError.removeClass("text-success");
            ipError.addClass("text-danger");
        }

    });

    addIpBtn.on("click", function(){
        let url = "http://api.ipstack.com/" + ipAddress.val() + "?access_key=633c25dad9ab043484e8fff3afcdbf8f";
        $.get(url, function(data, status){
            if(status === "success"){
                let tr = $("<tr></tr>");

                let ip = $("<td></td>");
                ip.append(data.ip);

                let countryName = $("<td></td>");
                countryName.append(data.country_name);

                let countryCode = $("<td></td>");
                countryCode.append(data.country_code);

                let action = $("<td></td>");
                let deleteBtn = $("<button></button>");
                deleteBtn.text("Delete");
                deleteBtn.addClass("btn btn-danger delete");
                action.append(deleteBtn);

                tr.append(ip, countryName,countryCode, action);
                tableBody.append(tr);

            } else {
                alert("Ooops... something went wrong!");
            }
        });
    });


    search.on("keyup", function(){
       let value = $(this).val().toLowerCase();
        tableBody.children().filter(function(){
           $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $(".delete").on("click", function(){
        console.log($(this));
        // alert($(this));
    });
});

function validateIp(ip){
    let validationRule = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return validationRule.test(ip);
}

