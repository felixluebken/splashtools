let xhr = new XMLHttpRequest();


function submit_auth() {
    var license_key = document.getElementById("license_key").value
    document.getElementById("auth_status").style.marginLeft = "177px";
    document.getElementById("auth_status").innerHTML = "Verifying...";

    xhr.open("POST","http://localhost:8081/auth")
    xhr.send(license_key)
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText)
        if(response["status"] == 0) {
            document.getElementById("auth_status").innerHTML = "Success!";
            document.getElementById("auth_status").style.marginLeft = "177px";
        } else if(response["status"] == 1) {
            document.getElementById("auth_status").innerHTML = "Invalid Key";
            document.getElementById("auth_status").style.marginLeft = "172px";
        } else if(response["status"] == 2) {
            document.getElementById("auth_status").innerHTML = "Key Already Active";
            document.getElementById("auth_status").style.marginLeft = "132px";
        }
    }

    

}