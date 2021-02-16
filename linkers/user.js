let xhr_user = new XMLHttpRequest();

window.addEventListener("load", function(){
    xhr_user.open("GET","http://localhost:8081/auth/user")
    xhr_user.send()

    xhr_user.onload = function() {
        var user = JSON.parse(xhr_user.responseText)
        console.log(user)

        if(user["active"] == "Active") {
            document.getElementById("user_section-info-membership").innerHTML = "Active"
            document.getElementById("user_section-info-membership").style.color = "#49B3A8"
        } else {
            document.getElementById("user_section-info-membership").innerHTML = "Inactive"
            document.getElementById("user_section-info-membership").style.color = "#FA5677"
        }

        document.getElementById("user_section-head-usr").innerHTML = user["user"]
        document.getElementById("dashboard-user-name").innerHTML = user["user"]

        document.getElementById("user_section-info-type").innerHTML = user["payment_currency"] + user["payment_amount"] + " " + user["payment_type"]
        document.getElementById("user_section-info-renewal").innerHTML = user["payment_renewal"]
    

        document.getElementById("menu_profile-pic").style.backgroundImage = "url(" + user["discord"]["avatar_url"] + ")";
        document.getElementById("user_section-head-profile_pic").style.backgroundImage = "url(" + user["discord"]["avatar_url"] + ")";
        document.getElementById("dashboard-user-profile_pic").style.backgroundImage = "url(" + user["discord"]["avatar_url"] + ")";
        
        document.getElementById("menu_profile-pic").style.visibility = "visible";
        document.getElementById("menu_profile-pic").style.opacity = "1";

        document.getElementById("menu_dropdown").style.visibility = "visible";
        document.getElementById("menu_dropdown").style.opacity = "1";
    }
});

function deactivate_device() {
    xhr.open("GET","http://localhost:8081/auth/deactivate")
    xhr.send()

    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText)
        var window = remote.getCurrentWindow()
        if(response["status"] == 1) {
            window.close()
        }
    }
}