var accounts;
var account_group_index = 0;

var account_group_edit_temp;
var account_group_remove_temp;
var account_remove_temp;
var account_edit_temp;
var browser_task_temp;
var account_test_temp;

let xhr = new XMLHttpRequest();
let xhr_updater = new XMLHttpRequest();


setInterval("update_accounts_status()",1000);

//SLEEP DECLARED IN dashboard.js

window.addEventListener("load", function(){
    get_account_groups();
    
    document.getElementById("menu_search").addEventListener("keyup",
        function(event) {
            if (document.getElementById("captcha_page").style.visibility === 'visible') {
                var search_term = document.getElementById("menu_search").value.toLowerCase()
                if(search_term == "") {
                    update_accounts_table()
                } else {
                    update_accounts_table_by_search(search_term)
                }
                    
                
            }
            
        }
    )
    
});

//ACCOUNT FUNCTIONS
function show_popup_account_add() {
    var popup = document.getElementById("popup-account_add");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_account_add() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-account_add");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_account_remove() {
    var popup = document.getElementById("popup-account_remove");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_account_remove() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-account_remove");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_account_edit() {
    var popup = document.getElementById("popup-account_edit");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_account_edit() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-account_edit");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_account_import() {
    var popup = document.getElementById("popup-account_import");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_account_import() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-account_import");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}

function show_popup_account_export() {
    export_accounts()
    var popup = document.getElementById("popup-account_export");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_account_export() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-account_export");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}


function add_account() {
    var emailInput = document.getElementById("popup-account_add_email").value;
    document.getElementById("popup-account_add_email").value = "";

    var passInput = document.getElementById("popup-account_add_pass").value;
    document.getElementById("popup-account_add_pass").value = "";

    var recoveryInput = document.getElementById("popup-account_add_recovery").value;
    document.getElementById("popup-account_add_recovery").value = "";

    var proxyInput = document.getElementById("popup-account_add_proxy").value;
    document.getElementById("popup-account_add_proxy").value = "";

    var requestValue = "http://localhost:8081/captcha/accounts?task=add&email=" + emailInput + "&pwd=" + passInput + "&recovery=" + recoveryInput + "&group=" + account_group_index;
    console.log(requestValue)
    
    hide_popup_account_add()

	xhr.open("POST",requestValue);
    xhr.send();

    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        update_accounts_table()
    }
};
function remove_account(id) {
    account_remove_temp = id;
    show_popup_account_remove();
};
function remove_account_confirm() {
    var requestValue = "http://localhost:8081/captcha/accounts?task=remove&id=" + account_remove_temp + "&group=" + account_group_index;

    xhr.open("POST",requestValue);
    xhr.send();

    hide_popup_account_remove()
    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        update_accounts_table()
    }

};
function edit_account(id) {
    account_edit_temp = id;

    for(var i in accounts["groups"][account_group_index]["accounts"]) {
        if(accounts["groups"][account_group_index]["accounts"][i]["id"] == id) {
            var account = accounts["groups"][account_group_index]["accounts"][i];
            break;
        }
    }
    

    document.getElementById("popup-account_edit_email").value = account["email"];
    document.getElementById("popup-account_edit_pass").value = account["password"];
    document.getElementById("popup-account_edit_recovery").value = account["recovery"];
    document.getElementById("popup-account_edit_proxy").value = account["proxy"];



    show_popup_account_edit();
};
function edit_account_confirm() {
    var emailInput = document.getElementById("popup-account_edit_email").value;
    var passInput = document.getElementById("popup-account_edit_pass").value;
    var recoveryInput = document.getElementById("popup-account_edit_recovery").value;
    var requestValue = document.getElementById("popup-account_edit_proxy").value;

    var requestValue = "http://localhost:8081/captcha/accounts?task=edit&id=" + account_edit_temp + "&email=" + emailInput + "&pwd=" + passInput + "&recovery=" + recoveryInput + "&group=" + account_group_index;

    var popup = document.getElementById("popup-account_edit");

	xhr.open("POST",requestValue);
    xhr.send();
    
    hide_popup_account_edit()

    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        update_accounts_table();
    }
};


function export_accounts() {
    var text_input = document.getElementById("account-export-values");
    text_input.value = ""
    for(var i in accounts["groups"][account_group_index]["accounts"]){
        var account = accounts["groups"][account_group_index]["accounts"][i]

        if (account["email"] == "") {
            var email = "no_email"
        }  else {
            var email = account["email"]
        }

        if (account["password"] == "") {
            var password = "no_password"
        }  else {
            var password = account["password"]
        }

        if (account["recovery"] == "") {
            var recovery = "no_recovery"
        }  else {
            var recovery = account["recovery"]
        }

        if (account["proxy"] == "") {
            var proxy = "no_proxy"
        }  else {
            var proxy = account["proxy"]
        }

        text_input.value += email + ";" + password + ";" + recovery + ";" + proxy + '\n'
    }
}

function import_accounts() {
    var lines = document.getElementById("account-import-values").value.split("\n")
    var import_accounts = []
    console.log(lines)

    for(var i in lines) {

        var account_parts = lines[i].split(';')
        if(account_parts.length < 4) {
            continue
        }
        if(account_parts[0] == "no_email") {
            account_parts[0] = ""
        }
        if(account_parts[1] == "no_password") {
            account_parts[1] = ""
        }
        if(account_parts[2] == "no_recovery") {
            account_parts[2] = ""
        }
        if(account_parts[3] == "no_proxy") {
            account_parts[3] = ""
        }


        var account = {
            "id":"",
            "email":account_parts[0],
            "password":account_parts[1],
            "recovery":account_parts[2],
            "score":"0",
            "proxy":account_parts[3],
            "status":"Inactive"
        }
        import_accounts.push(account)
    }

    xhr.open("POST","http://localhost:8081/captcha/import?group=" + account_group_index);
    xhr.send(JSON.stringify(import_accounts));

    hide_popup_account_import()

    xhr.onload = function() {
        accounts = JSON.parse(xhr.responseText);
        update_accounts_table();
    }
}


function update_accounts_table() {
    var table = document.getElementById("captcha-main_table");

    var account_count = 0;
    var no_score = 0;
    var low_score = 0;
    var medium_score = 0;
    var high_score = 0;

    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }

    for(var i in accounts["groups"][account_group_index]["accounts"]) {
        var row = table.insertRow(table.rows.length);
        var email = row.insertCell(0);
        var status = row.insertCell(1);
        var score_level = row.insertCell(2);
        var actions = row.insertCell(3);
        var modify = row.insertCell(4)
        
        //EMAIL UPDATE
        email.innerHTML = accounts["groups"][account_group_index]["accounts"][i]["email"];

        //SCORE UPDATE
        var score = accounts["groups"][account_group_index]["accounts"][i]["score"];
        var score_div = document.createElement('div');
        var score_style = 'background: url("../pages/style/images/v3-score-none.png");height: 5px;width: 165px;';
        if(score == "0"){
            no_score++;
            score_style = 'background: url("../pages/style/images/v3-score-none.png");height: 5px;width: 165px;'

        } else if(score == "0.1" || score == "0.2" || score == "0.3" || score == "0.4"){
            low_score++;
            score_style = 'background: url("../pages/style/images/v3-score-low.png");height: 5px;width: 165px;'

        } else if(score == "0.5" || score == "0.6" || score == "0.7" || score == "0.8"){
            medium_score++;
            score_style = 'background: url("../pages/style/images/v3-score-medium.png");height: 5px;width: 165px;'

        } else if(score == "0.9"){
            high_score++;
            score_style = 'background: url("../pages/style/images/v3-score-high.png");height: 5px;width: 165px;'

        };
        score_div.setAttribute('style',score_style);
        score_level.appendChild(score_div)


        //STATUS UPDATE
        var current_status = accounts["groups"][account_group_index]["accounts"][i]["status"];
        if (current_status == "Inactive") {
            status.innerHTML = current_status;
            status.style.color = "#FA5677";
        } else if(current_status.includes("Browsing") || current_status.includes("Signing into") || current_status.includes("Watching") || current_status.includes("Starting") || current_status.includes("Logging in")) {
            status.innerHTML = current_status;
            status.style.color = "#59F3A0";
        } else if(current_status.includes("Error") || current_status.includes("Manual Login")) {
            status.innerHTML = current_status;
            status.style.color = "#FFC74F";
        } else if(current_status.includes("Sleeping")) {
            status.innerHTML = current_status;
            status.style.color = "#81CEF0";
        } else {
            status.innerHTML = current_status;
            status.style.color = "#81CEF0";
        }

        //ACTIONS UPDATE
        var id = accounts["groups"][account_group_index]["accounts"][i]["id"];
        var start_task_div = document.createElement('div');
        var stop_task_div = document.createElement('div');
        var view_task_div = document.createElement('div');
        var edit_task_div = document.createElement('div');
        var test_task_div = document.createElement('div');
        var delete_task_div = document.createElement('div');

        start_task_div.setAttribute('class','table_icon-start');
        start_task_div.setAttribute('onclick','start_task(' + id +')')

        stop_task_div.setAttribute('class','table_icon-stop');
        stop_task_div.setAttribute('onclick','stop_task(' + id +')')


        view_task_div.setAttribute('class','table_icon-view');
        view_task_div.setAttribute('onclick','start_browser_task(' + id +')')

        test_task_div.setAttribute('class','table_icon-test');
        test_task_div.setAttribute('onclick','test_captcha(' + id +')')

        edit_task_div.setAttribute('class','table_icon-edit');
        
        delete_task_div.setAttribute('class','table_icon-delete');

        var remove_command = "remove_account(" + id + ")";
        delete_task_div.setAttribute('onclick', remove_command);

        var edit_command = "edit_account(" + id +")";
        edit_task_div.setAttribute('onclick', edit_command);

        actions.appendChild(start_task_div);
        actions.appendChild(stop_task_div);
        modify.appendChild(view_task_div);
        modify.appendChild(edit_task_div);
        modify.appendChild(test_task_div);
        modify.appendChild(delete_task_div);



        account_count++;
    }

    document.getElementById("task_viewer-tasks-text").innerHTML = account_count.toString();
    document.getElementById("high_score-value").innerHTML = high_score.toString();
    document.getElementById("medium_score-value").innerHTML = medium_score.toString();
    document.getElementById("low_score-value").innerHTML = low_score.toString();
    document.getElementById("none_score-value").innerHTML = no_score.toString();
    
};
function update_accounts_table_empty() {
    var table = document.getElementById("captcha-main_table");

    var account_count = 0;
    var no_score = 0;
    var low_score = 0;
    var medium_score = 0;
    var high_score = 0;

    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }

    document.getElementById("task_viewer-tasks-text").innerHTML = account_count.toString();
    document.getElementById("high_score-value").innerHTML = high_score.toString();
    document.getElementById("medium_score-value").innerHTML = medium_score.toString();
    document.getElementById("low_score-value").innerHTML = low_score.toString();
    document.getElementById("none_score-value").innerHTML = no_score.toString();
};
function update_accounts_table_by_search(search_term) {
    var table = document.getElementById("captcha-main_table");

    var account_count = 0;
    var no_score = 0;
    var low_score = 0;
    var medium_score = 0;
    var high_score = 0;

    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    for(var i in accounts["groups"][account_group_index]["accounts"]) {
        if(JSON.stringify(accounts["groups"][account_group_index]["accounts"][i]).toLowerCase().indexOf(search_term) > -1){
            var row = table.insertRow(table.rows.length);
            var email = row.insertCell(0);
            var status = row.insertCell(1);
            var score_level = row.insertCell(2);
            var actions = row.insertCell(3);
            var modify = row.insertCell(4)
            
            //EMAIL UPDATE
            email.innerHTML = accounts["groups"][account_group_index]["accounts"][i]["email"];

            //SCORE UPDATE
            var score = accounts["groups"][account_group_index]["accounts"][i]["score"];
            var score_div = document.createElement('div');
            var score_style = 'background: url("../pages/style/images/v3-score-none.png");height: 5px;width: 165px;';
            if(score == "0"){
                no_score++;
                score_style = 'background: url("../pages/style/images/v3-score-none.png");height: 5px;width: 165px;'

            } else if(score == "0.1" || score == "0.2" || score == "0.3" || score == "0.4"){
                low_score++;
                score_style = 'background: url("../pages/style/images/v3-score-low.png");height: 5px;width: 165px;'

            } else if(score == "0.5" || score == "0.6" || score == "0.7" || score == "0.8"){
                medium_score++;
                score_style = 'background: url("../pages/style/images/v3-score-medium.png");height: 5px;width: 165px;'

            } else if(score == "0.9"){
                high_score++;
                score_style = 'background: url("../pages/style/images/v3-score-high.png");height: 5px;width: 165px;'

            };
            score_div.setAttribute('style',score_style);
            score_level.appendChild(score_div)


            //STATUS UPDATE
            var current_status = accounts["groups"][account_group_index]["accounts"][i]["status"];
            if (current_status == "Inactive") {
                status.innerHTML = current_status;
                status.style.color = "#FA5677";
            } else if(current_status.includes("Browsing") || current_status.includes("Signing into") || current_status.includes("Watching") || current_status.includes("Starting") || current_status.includes("Logging in")) {
                status.innerHTML = current_status;
                status.style.color = "#59F3A0";
            } else if(current_status.includes("Error") || current_status.includes("Manual Login")) {
                status.innerHTML = current_status;
                status.style.color = "#FFC74F";
            } else if(current_status.includes("Sleeping")) {
                status.innerHTML = current_status;
                status.style.color = "#81CEF0";
            } else {
                status.innerHTML = current_status;
                status.style.color = "#81CEF0";
            }

            //ACTIONS UPDATE
            var id = accounts["groups"][account_group_index]["accounts"][i]["id"];
            var start_task_div = document.createElement('div');
            var stop_task_div = document.createElement('div');
            var view_task_div = document.createElement('div');
            var edit_task_div = document.createElement('div');
            var test_task_div = document.createElement('div');
            var delete_task_div = document.createElement('div');

            start_task_div.setAttribute('class','table_icon-start');
            start_task_div.setAttribute('onclick','start_task(' + id +')')

            stop_task_div.setAttribute('class','table_icon-stop');
            stop_task_div.setAttribute('onclick','stop_task(' + id +')')


            view_task_div.setAttribute('class','table_icon-view');
            view_task_div.setAttribute('onclick','start_browser_task(' + id +')')

            test_task_div.setAttribute('class','table_icon-test');
            test_task_div.setAttribute('onclick','test_captcha(' + id +')')

            edit_task_div.setAttribute('class','table_icon-edit');
            
            delete_task_div.setAttribute('class','table_icon-delete');

            var remove_command = "remove_account(" + id + ")";
            delete_task_div.setAttribute('onclick', remove_command);

            var edit_command = "edit_account(" + id +")";
            edit_task_div.setAttribute('onclick', edit_command);

            actions.appendChild(start_task_div);
            actions.appendChild(stop_task_div);
            modify.appendChild(view_task_div);
            modify.appendChild(edit_task_div);
            modify.appendChild(test_task_div);
            modify.appendChild(delete_task_div);



            account_count++;
        }
    }
    document.getElementById("task_viewer-tasks-text").innerHTML = account_count.toString();
    document.getElementById("high_score-value").innerHTML = high_score.toString();
    document.getElementById("medium_score-value").innerHTML = medium_score.toString();
    document.getElementById("low_score-value").innerHTML = low_score.toString();
    document.getElementById("none_score-value").innerHTML = no_score.toString();
}


// GENERATOR FUNCTIONS
function show_popup_browser_task() {
    var popup = document.getElementById("popup-start_browser");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_browser_task() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";
    var popup = document.getElementById("popup-start_browser");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_test_captcha() {
    var popup = document.getElementById("popup-test_captcha");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_test_captcha() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";
    var popup = document.getElementById("popup-test_captcha");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function test_captcha(id) {
    show_popup_test_captcha()
    account_test_temp = id;
};
function test_captcha_confirm(type) {
    console.log("testing tasks")
    var post_message = "http://localhost:8081/captcha/run?task=test&type=" + type + "&group=" + account_group_index + "&id=" + account_test_temp
    xhr.open("POST",post_message)
    xhr.send();
    hide_popup_test_captcha()
}


function start_task(id) {

    for(var i in accounts["groups"][account_group_index]["accounts"]) {
        if(accounts["groups"][account_group_index]["accounts"][i]["id"] == id){
            if(accounts["groups"][account_group_index]["accounts"][i]["status"] != "Inactive"){
                console.log("intercepted task start")
                return
            }
        }
    }

    console.log("starting tasks")
    var post_message = "http://localhost:8081/captcha/run?task=start&type=0&group=" + account_group_index + "&id=" + id
    xhr.open("POST",post_message)
    xhr.send();
};
function start_browser_task(id) {
    browser_task_temp = id;
    show_popup_browser_task()
}
function start_browser_task_confirm() {
    console.log("starting tasks")
    
    var post_message = "http://localhost:8081/captcha/run?task=start&type=1&group=" + account_group_index + "&id=" + browser_task_temp
    xhr.open("POST",post_message)
    xhr.send();

    hide_popup_browser_task()
};

async function disable_start_all_temp() {
    document.getElementById("captcha_control-start_all").disabled = true;
    await sleep(4000)
    document.getElementById("captcha_control-start_all").disabled = false;
}

var task_index = 0
function start_all_tasks() {
    
    setTimeout(function() {

        if(accounts["groups"][account_group_index]["accounts"][task_index]["status"] == "Inactive") {
            var post_message = "http://localhost:8081/captcha/run?task=start&group=" + account_group_index + "&id=" + accounts["groups"][account_group_index]["accounts"][task_index]["id"];
            xhr.open("POST",post_message);
            xhr.send();
        }
        
        console.log(task_index)
        task_index++;
        if(task_index < accounts["groups"][account_group_index]["accounts"].length) {
            start_all_tasks()
        }
        else {
            task_index = 0
            return
        }
    },500)
    //update_accounts_table_start()
};
async function stop_task(id) {
    for(var i in accounts["groups"][account_group_index]["accounts"]) {
        if(accounts["groups"][account_group_index]["accounts"][i]["id"] == id){
            if(accounts["groups"][account_group_index]["accounts"][i]["status"] == "Starting drivers"){
                console.log("starting sleep")
                await sleep(4000)
                console.log("done sleep")
            }
        }
    }
    console.log("stopping tasks")
    var post_message = "http://localhost:8081/captcha/run?task=stop&id=" + id
    xhr.open("POST",post_message)
    xhr.send();
};
function stop_all_tasks() {
    
    var post_message = "http://localhost:8081/captcha/run?task=stop_all";
    xhr.open("POST",post_message);
    xhr.send();
    update_accounts_table_stop()
};

function update_accounts_table_start() {
    var table = document.getElementById("captcha-main_table");
    for(var i in table.rows) {
        var row = table.rows[i];
        var status = row.cells[1];
        status.innerHTML = "Starting ...";
        status.style.color = "#FFC74F";
    }
}
function update_accounts_table_stop() {
    var table = document.getElementById("captcha-main_table");
    for(var i in table.rows) {
        var row = table.rows[i];
        var status = row.cells[1];
        status.innerHTML = "Stopping ...";
        status.style.color = "#FFC74F";
    }
}

function update_accounts_status() {
    var table = document.getElementById("captcha-main_table");

    xhr_updater.open("GET","http://localhost:8081/captcha/groups",true);
    xhr_updater.send();
    
    xhr_updater.onload=function(){
        accounts = JSON.parse(xhr_updater.responseText);
        //update_account_groups();
        for(var i in table.rows) {
            var row = table.rows[i];
            var email = row.cells[0].innerHTML;
            var status = row.cells[1];
            var current_status = get_status_by_email(email);
            

            if (current_status == "Inactive") {
                status.innerHTML = current_status;
                status.style.color = "#FA5677";
            } else if(current_status.includes("Browsing") || current_status.includes("Signing into") || current_status.includes("Watching") || current_status.includes("Starting") || current_status.includes("Logging in")) {
                status.innerHTML = current_status;
                status.style.color = "#59F3A0";
            } else if(current_status.includes("Error") || current_status.includes("Manual Login")) {
                status.innerHTML = current_status;
                status.style.color = "#FFC74F";
            } else if(current_status.includes("Sleeping")) {
                status.innerHTML = current_status;
                status.style.color = "#81CEF0";
            } else {
                status.innerHTML = current_status;
                status.style.color = "#81CEF0";
            }
        }
    }
    /*
    fetch('../storage/gmail_accounts.json')
        .then(response => response.json())
        .then(data => {
        // Do something with your data
            console.log(data)
            accounts = data;
            for(var i in table.rows) {
                var row = table.rows[i];
                var email = row.cells[0].innerHTML;
                var status = row.cells[1];
                var current_status = get_status_by_email(email);
    
                if (current_status == "Inactive") {
                    status.innerHTML = current_status;
                    status.style.color = "#FA5677";
                } else if(current_status.includes("Browsing") || current_status.includes("Signing into") || current_status.includes("Watching") || current_status.includes("Starting") || current_status.includes("Logging in")) {
                    status.innerHTML = current_status;
                    status.style.color = "#59F3A0";
                } else if(current_status.includes("Error") || current_status.includes("Manual Login")) {
                    status.innerHTML = current_status;
                    status.style.color = "#FFC74F";
                } else if(current_status.includes("Sleeping")) {
                    status.innerHTML = current_status;
                    status.style.color = "#81CEF0";
                } else {
                    status.innerHTML = current_status;
                    status.style.color = "#81CEF0";
                }
            }
        });
    */
};
function get_status_by_email(email) {
    for(var i in accounts["groups"][account_group_index]["accounts"]){
        if (accounts["groups"][account_group_index]["accounts"][i]["email"] == email) {
            return accounts["groups"][account_group_index]["accounts"][i]["status"]
        };
    };
};

// GROUP FUNCTIONS
function show_popup_account_group_edit() {
    var popup = document.getElementById("popup-account_group_edit");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_account_group_edit() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";
    var popup = document.getElementById("popup-account_group_edit");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};
function show_popup_account_group_remove() {
    var popup = document.getElementById("popup-account_group_remove");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_account_group_remove() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";
    var popup = document.getElementById("popup-account_group_remove");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_account_group_name() {
    var popup = document.getElementById("popup-account_group_name");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";
        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_account_group_name() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";
    var popup = document.getElementById("popup-account_group_name");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function get_account_groups() {
	xhr.open("GET","http://localhost:8081/captcha/groups",true);
    xhr.send();
    
    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        update_account_groups();
    }
    /*
    fetch('../storage/gmail_accounts.json')
        .then(response => response.json())
        .then(data => {
        // Do something with your data
            accounts = data;
            update_groups()
        });
    */
};
function add_account_group() {
    var inputValue = document.getElementById("popup-account_group_name-input").value;
    document.getElementById("popup-account_group_name-input").value = "";
    var requestValue = "http://localhost:8081/captcha/groups?task=add&name=" + inputValue;
    var popup = document.getElementById("popup-group_name");

	xhr.open("POST",requestValue);
    xhr.send();
    
    hide_popup_account_group_name()

    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        update_account_groups();
    }
};
function remove_account_group(i) {
    show_popup_account_group_remove()
    account_group_remove_temp = i;
};
function remove_account_group_confirm() {
    var requestValue = "http://localhost:8081/captcha/groups?task=remove&index=" + account_group_remove_temp;

    
	xhr.open("POST",requestValue);
    xhr.send();

    hide_popup_account_group_remove()

    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        account_group_index = 0;
        update_account_groups();
    }
}
function edit_account_group() {
    console.log("editing")
    var i = account_group_index

    document.getElementById("popup-account_group_edit-input").value = accounts["groups"][i]["name"]

    show_popup_account_group_edit()
    account_group_edit_temp = i
}
function edit_account_group_confirm() {
    var requestValue = "http://localhost:8081/captcha/groups?task=edit&index=" + account_group_edit_temp + "&name=" + document.getElementById("popup-account_group_edit-input").value;

    console.log("editing")

	xhr.open("POST",requestValue);
    xhr.send();

    hide_popup_account_group_edit()

    xhr.onload=function(){
        accounts = JSON.parse(xhr.responseText);
        
        update_account_groups();
    }
}

function update_account_groups() {
    var group_container = document.getElementById("captcha_groups");
    while (group_container.firstChild) {
        group_container.removeChild(group_container.lastChild);
    };
    for(var i in accounts["groups"]) {

        var remove_func = "remove_account_group(" + i.toString() + ")"
        var switch_func = "switch_account_group(" + i.toString() + ")"

        var group_name = document.createElement("span");
        group_name.setAttribute("class","group_name");
        group_name.setAttribute("onclick",switch_func);
        group_name.ondblclick = function(){
            edit_account_group()
        }
        group_name.innerHTML = accounts["groups"][i]["name"];

        var group_rem = document.createElement("div");
        group_rem.setAttribute("class","group_remove");
        group_rem.setAttribute("onclick",remove_func);

        var group_div = document.createElement("div");
        group_div.setAttribute("class","group");
        group_div.appendChild(group_name);
        group_div.appendChild(group_rem);

        group_container.appendChild(group_div);
    };
    if (accounts["groups"].length != 6){
        var group_add = document.createElement("div");
        group_add.setAttribute("id","add_group");
        group_add.setAttribute("class","group_add");
        group_add.setAttribute("onclick","show_popup_account_group_name()");

        group_container.appendChild(group_add);
    }
    

    switch_account_group(account_group_index);

};
function switch_account_group(i) {
    var group_container = document.getElementById("captcha_groups");
    var groups = group_container.childNodes;
    if(groups.length == 1) {
        account_group_index = null;
        update_accounts_table_empty()
        return;
    }
    for(var index in groups) {
        if(index == i) {
            groups[index].setAttribute("style","background: #161B2E;");
        } 
        else if(index == groups.length-1) {
            break;
        }
        else {
            groups[index].removeAttribute("style");
        }
    }
    account_group_index = i
    update_accounts_table()
};
