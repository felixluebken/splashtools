


var cards;
var card_group_index = 0;
var card_group_edit_temp;
var card_group_remove_temp;
var card_index;



let xhr_cards = new XMLHttpRequest();


window.addEventListener("load", function(){
    get_card_groups();

    var card_type_select = document.getElementById("cards-type_select");
    var card_account_select = document.getElementById("cards-account_select");
    card_type_select.addEventListener('change',(event) => {
        if(card_type_select.value == "") {
            var length = card_account_select.options.length
            for(var i = length-1;i>=0;i--) {
                card_account_select.options[i] = null
            }
            var opt = document.createElement("option")
            opt.value = ""
            opt.text = "Select"
            card_account_select.add(opt,null)
        }
        else if(card_type_select.value == "privacy") {
            var length = card_account_select.options.length
            for(i = length-1;i>=0;i--) {
                card_account_select.options[i] = null
            }
            var opt = document.createElement("option")
            opt.value = ""
            opt.text = "Select"
            card_account_select.add(opt,null)

            console.log("adding privacy cards")
            for(var i in cards["accounts"]["privacy"]) {
                var opt = document.createElement("option")
                opt.value = i
                opt.text = cards["accounts"]["privacy"][i]["user"]
                card_account_select.add(opt,null)
            }
        }
    })


    
    document.getElementById("menu_search").addEventListener("keyup",
        function(event) {
            if (document.getElementById("cards_page").style.visibility === 'visible') { 
                var search_term = document.getElementById("menu_search").value.toLowerCase()
                if(search_term == "") {
                    update_cards_table()
                } else {
                    update_cards_table_by_search(search_term)
                }
                    
            }
            
        }
    )
    
});

function reset_card_account_dropdown() {
    

    var card_account_select = document.getElementById("cards-account_select");
    var length = card_account_select.options.length
    for(var i = length-1;i>=0;i--) {
        card_account_select.options[i] = null
    }
    var opt = document.createElement("option")
    opt.value = ""
    opt.text = "Select"
    card_account_select.add(opt,null)

    var card_type_select = document.getElementById("cards-type_select");
    card_type_select.value = "";
}





function show_popup_no_selection() {
    var popup = document.getElementById("popup-no_selection");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_no_selection() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-no_selection");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}
function show_popup_cards_add_account() {
    var popup = document.getElementById("popup-cards_add_account");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_cards_add_account() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_add_account");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}
function show_popup_cards_import_error() {
    var popup = document.getElementById("popup-cards_import_error");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_cards_import_error() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_import_error");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}
function show_popup_cards_remove() {
    var checked = get_checked_in_cards_table()

    if(checked.length == 0) {
        show_popup_no_selection()
        return
    }

    var popup = document.getElementById("popup-cards_remove");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_cards_remove() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_remove");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}
function show_popup_cards_move() {

    var checked = get_checked_in_cards_table()

    if(checked.length == 0) {
        show_popup_no_selection()
        return
    }

    var cards_group_select = document.getElementById("cards_move-select")

    while(cards_group_select.hasChildNodes())
    {
        cards_group_select.removeChild(cards_group_select.firstChild);
    }

    for(var i in cards["groups"]) {
        cards_group_select.options[cards_group_select.length] = new Option(cards["groups"][i]["name"],i);
    }

    var popup = document.getElementById("popup-cards_move");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_cards_move() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_move");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}
function show_popup_cards_export() {

    var checked = get_checked_in_cards_table()

    if(checked.length == 0) {
        show_popup_no_selection()
        return
    }

    var cards_export_select = document.getElementById("cards_export-select")
    

    xhr_cards.open("GET","http://localhost:8081/profiles/groups",true);
    xhr_cards.send();
    
    xhr_cards.onload=function(){
        var profiles = JSON.parse(xhr_profiles.responseText);
        console.log(profiles)
    }

    document.getElementById("cards_export-card_count").innerHTML = get_checked_in_cards_table().length
    document.getElementById("cards_export-billing_count").innerHTML = profiles["groups"][0]["profiles"].length

    while(cards_export_select.hasChildNodes())
    {
        cards_export_select.removeChild(cards_export_select.firstChild);
    }

    for(var i in profiles["groups"]) {
        cards_export_select.options[cards_export_select.length] = new Option(profiles["groups"][i]["name"],i);
    }

    cards_export_select.addEventListener('change',(event) => {
        var billing_group_index = cards_export_select.value
        document.getElementById("cards_export-billing_count").innerHTML = profiles["groups"][billing_group_index]["profiles"].length
    })

    var popup = document.getElementById("popup-cards_export");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
}
function hide_popup_cards_export() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_export");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
}


function add_card_account() {
    var type = document.getElementById("card_account_add_type").value;
    var username = document.getElementById("card_account_add_username").value;
    var password = document.getElementById("card_account_add_password").value;

    document.getElementById("card_account_add_type").value = "";
    document.getElementById("card_account_add_username").value = "";
    document.getElementById("card_account_add_password").value = "";

    hide_popup_cards_add_account();

    xhr_cards.open("GET","http://localhost:8081/cards/add_account?type=" + type + "&username=" + username + "&password=" + password)
    xhr_cards.send()
    xhr_cards.onload = function() {
        cards = JSON.parse(xhr_cards.responseText)
        reset_card_account_dropdown()
    }
}
function remove_card_account() {
    var type = document.getElementById("cards-type_select").value
    var account_index = document.getElementById("cards-account_select").value
    if(type != "" || account_index != "") {
        account_index = parseInt(account_index)
        console.log(account_index)
        xhr_cards.open("GET","http://localhost:8081/cards/remove_account?type=" + type + "&index=" + account_index)
        xhr_cards.send()
        xhr_cards.onload = function() {
            cards = JSON.parse(xhr_cards.responseText)
            reset_card_account_dropdown()
    }
    }
}

function import_account_cards() {
    
    var type = document.getElementById("cards-type_select").value
    var account_index = document.getElementById("cards-account_select").value
    var amount = document.getElementById("cards-amount_input").value
    if(type == "" || account_index == "" || amount == "") {
        document.getElementById("popup-cards_import_error_description").innerHTML = "Please select valid parameters."
        show_popup_cards_import_error()
        return
    }
    account_index = parseInt(account_index)
    amount = parseInt(amount)

    var username = cards["accounts"]["privacy"][account_index]["user"]
    var password = cards["accounts"]["privacy"][account_index]["password"]

    xhr_cards.open("GET","http://localhost:8081/cards/import?group=" + card_group_index + "&type=" + type + "&username=" + username + "&password=" + password + "&amount=" + amount)
    xhr_cards.send()
    xhr_cards.onload = function() {
        var response = JSON.parse(xhr_cards.responseText)

        console.log(response[0])
        if(response[0] == "error") {
            document.getElementById("popup-cards_import_error_description").innerHTML = response[1]
            show_popup_cards_import_error()
        } else {
            cards = response
            update_cards_table()
        }
        
    }

}
function export_account_cards() {

    var profile_group = document.getElementById("cards_export-select").value
    var export_values = get_checked_in_cards_table()
    
    if(document.getElementById("cards_export_reuse").checked) {
        var reuse_cards = 0
    } else {
        var reuse_cards = 1
    }


    hide_popup_cards_export()

    xhr_cards.open("POST","http://localhost:8081/cards/export?group=" + card_group_index + "&profile_group=" + profile_group + "&reuse_cards=" + reuse_cards)
    xhr_cards.send(JSON.stringify(export_values))

    xhr_cards.onload=function() {
        cards = JSON.parse(xhr_cards.responseText)
        update_cards_table()
    }
}
function remove_account_cards() {
    var remove_values = get_checked_in_cards_table()
    xhr_cards.open("POST","http://localhost:8081/cards/remove?group=" + profile_group_index)
    xhr_cards.send(JSON.stringify(remove_values))

    hide_popup_cards_remove()

    xhr_cards.onload=function() {
        cards = JSON.parse(xhr_cards.responseText)
        update_cards_table()
    }
}
function move_account_cards() {
    var move_values = get_checked_in_cards_table()
    var group_value = document.getElementById("cards_move-select").value

    hide_popup_cards_move()

    xhr_cards.open("POST","http://localhost:8081/cards/move?group=" + card_group_index + "&new_group=" + group_value)
    xhr_cards.send(JSON.stringify(move_values))

    xhr_cards.onload=function() {
        cards = JSON.parse(xhr_cards.responseText)
        update_cards_table()
    }
}

function view_card_detail(i) {
    var name = cards["groups"][card_group_index]["cards"][i]["name"]
    var number = cards["groups"][card_group_index]["cards"][i]["no"]
    var expiry = cards["groups"][card_group_index]["cards"][i]["mo"] + "/" + cards["groups"][card_group_index]["cards"][i]["yr"]
    var type = cards["groups"][card_group_index]["cards"][i]["type"]
    var cvv = cards["groups"][card_group_index]["cards"][i]["cvv"]



    document.getElementById("card_viewer-name").innerHTML = name
    document.getElementById("card_viewer-number").innerHTML = number
    document.getElementById("card_viewer-expiry").innerHTML = expiry
    document.getElementById("card_viewer-type").innerHTML = type
    document.getElementById("card_viewer-cvv").innerHTML = cvv
}

function check_all_in_cards_table() {
    var checkbox_check_all = document.getElementById("cards-header_checkbox");
    var table = document.getElementById("cards-main_table");

    if (checkbox_check_all.checked == 1) {
        for(let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[5].getElementsByTagName('input')[0].checked = true;
        }
    } else {
        for(let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[5].getElementsByTagName('input')[0].checked = false;
        }
    }
}
function get_checked_in_cards_table() {
    var checked_values = []
    var table = document.getElementById("cards-main_table");
    for(let i = 0; i < table.rows.length; i++) {
        if(table.rows[i].cells[5].getElementsByTagName('input')[0].checked) {
            checked_values.push(parseInt(table.rows[i].cells[0].innerHTML))
        }
    }
    console.log(checked_values)
    return checked_values
}

function update_cards_table_empty() {
    var table = document.getElementById("cards-main_table");
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
}
function update_cards_table() {
    var table = document.getElementById("cards-main_table");
    var card_count = 0;
    document.getElementById("cards-header_checkbox").checked = false;

    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    for(var i in cards["groups"][card_group_index]["cards"]) {
        var row = table.insertRow(table.rows.length);

        var view_card_command = "view_card_detail(" + i + ")"
        row.setAttribute("onclick",view_card_command)


        var num = row.insertCell(0);
        var name = row.insertCell(1);
        var number = row.insertCell(2);
        var expiry = row.insertCell(3);
        var type = row.insertCell(4)
        var checkbox_cell = row.insertCell(5);

        num.innerHTML = i;
        name.innerHTML = cards["groups"][card_group_index]["cards"][i]["name"]
        number.innerHTML = "**** **** **** " + cards["groups"][card_group_index]["cards"][i]["no"].substring(12,16)
        expiry.innerHTML = cards["groups"][card_group_index]["cards"][i]["mo"] + "/" + cards["groups"][card_group_index]["cards"][i]["yr"]
        type.innerHTML = cards["groups"][card_group_index]["cards"][i]["type"]


        var checkbox_container = document.createElement('label')
        checkbox_container.setAttribute("class","checkbox_container")

        var checkbox = document.createElement('input')
        checkbox.setAttribute("type","checkbox")

        var checkmark = document.createElement('span')
        checkmark.setAttribute("class","checkmark")
        
        checkbox_container.appendChild(checkbox)
        checkbox_container.appendChild(checkmark)

        checkbox_cell.appendChild(checkbox_container)

        card_count++
        
    }
    document.getElementById("card_viewer-amount-text").innerHTML = card_count;
}


function update_cards_table_by_search(search_term) {

    var table = document.getElementById("cards-main_table");
    var card_count = 0;
    document.getElementById("cards-header_checkbox").checked = false;
    
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    
    for(var i in cards["groups"][card_group_index]["cards"]) {
        if(JSON.stringify(cards["groups"][card_group_index]["cards"][i]).toLowerCase().indexOf(search_term) > -1){  
            var row = table.insertRow(table.rows.length);

            var view_card_command = "view_card_detail(" + i + ")"
            row.setAttribute("onclick",view_card_command)
    
    
            var num = row.insertCell(0);
            var name = row.insertCell(1);
            var number = row.insertCell(2);
            var expiry = row.insertCell(3);
            var type = row.insertCell(4)
            var checkbox_cell = row.insertCell(5);
    
            num.innerHTML = i;
            name.innerHTML = cards["groups"][card_group_index]["cards"][i]["name"]
            number.innerHTML = "**** **** **** " + cards["groups"][card_group_index]["cards"][i]["no"].substring(12,16)
            expiry.innerHTML = cards["groups"][card_group_index]["cards"][i]["mo"] + "/" + cards["groups"][card_group_index]["cards"][i]["yr"]
            type.innerHTML = cards["groups"][card_group_index]["cards"][i]["type"]
    
    
            var checkbox_container = document.createElement('label')
            checkbox_container.setAttribute("class","checkbox_container")
    
            var checkbox = document.createElement('input')
            checkbox.setAttribute("type","checkbox")
    
            var checkmark = document.createElement('span')
            checkmark.setAttribute("class","checkmark")
            
            checkbox_container.appendChild(checkbox)
            checkbox_container.appendChild(checkmark)
    
            checkbox_cell.appendChild(checkbox_container)
    
            card_count++
        }
    }
    document.getElementById("card_viewer-amount-text").innerHTML = card_count;
}






function show_popup_cards_group_edit() {
    var popup = document.getElementById("popup-cards_group_edit");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_cards_group_edit() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_group_edit");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_cards_group_remove() {
    var popup = document.getElementById("popup-cards_group_remove");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_cards_group_remove() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_group_remove");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};

function show_popup_cards_group_name() {
    var popup = document.getElementById("popup-cards_group_name");
    if(popup.style.visibility === "hidden") {
        document.getElementById("page_blocker").style.zIndex = 6000;
        document.getElementById("page_blocker").style.display = "inline";

        document.getElementById("blur_section").setAttribute("style","filter: blur(2px);")
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        }
};
function hide_popup_cards_group_name() {
    document.getElementById("page_blocker").style.zIndex = 0;
    document.getElementById("page_blocker").style.display = "none";

    var popup = document.getElementById("popup-cards_group_name");
    document.getElementById("blur_section").setAttribute("style","filter: blur(0px);")
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
};








function get_card_groups() {
	xhr_cards.open("GET","http://localhost:8081/cards/groups",true);
    xhr_cards.send();
    
    xhr_cards.onload=function(){
        console.log("received")
        cards = JSON.parse(xhr_cards.responseText)
        console.log(cards)
        update_card_groups();
    }
};
function update_card_groups() {
    console.log("updating...")
    var group_container = document.getElementById("card_groups");
    while (group_container.firstChild) {
        group_container.removeChild(group_container.lastChild);
    };
    console.log("updating groups")
    for(var i in cards["groups"]) {
        console.log(i)
        var remove_func = "remove_card_group(" + i.toString() + ")"
        var switch_func = "switch_card_group(" + i.toString() + ")"
 
        var group_name = document.createElement("span");
        group_name.setAttribute("class","group_name");
        group_name.setAttribute("onclick",switch_func);
        group_name.innerHTML = cards["groups"][i]["name"];
        group_name.ondblclick = function(){
            edit_card_group()
        }

        var group_rem = document.createElement("div");
        group_rem.setAttribute("class","group_remove");
        group_rem.setAttribute("onclick",remove_func);

        var group_div = document.createElement("div");
        group_div.setAttribute("class","group");
        group_div.appendChild(group_name);
        group_div.appendChild(group_rem);

        group_container.appendChild(group_div);
    };
    if (cards["groups"].length != 6){
        var group_add = document.createElement("div");
        group_add.setAttribute("id","add_card_group");
        group_add.setAttribute("class","group_add");
        group_add.setAttribute("onclick","show_popup_cards_group_name()");

        group_container.appendChild(group_add);
    }
    

    switch_card_group(card_group_index);
};
function switch_card_group(i) {
    var group_container = document.getElementById("card_groups");
    var groups = group_container.childNodes;
    if(groups.length == 1) {
        cards_group_index = null;
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
    card_group_index = i
    update_cards_table()
};






function add_cards_group() {

    var inputValue = document.getElementById("popup-cards_group_name-input").value;
    document.getElementById("popup-cards_group_name-input").value = "";
    var requestValue = "http://localhost:8081/cards/groups?task=add&name=" + inputValue;
    

	xhr_cards.open("POST",requestValue);
    xhr_cards.send();
    
    hide_popup_cards_group_name()
    

    xhr_cards.onload=function(){
        cards = JSON.parse(xhr_cards.responseText);
        console.log(cards)
        update_card_groups();
    }
};


function remove_card_group(i) {
    show_popup_cards_group_remove()
    card_group_remove_temp = i;
};
function remove_card_group_confirm() {
    var requestValue = "http://localhost:8081/cards/groups?task=remove&index=" + card_group_remove_temp;

    
	xhr_cards.open("POST",requestValue);
    xhr_cards.send();

    hide_popup_cards_group_remove()
    xhr_cards.onload=function(){
        cards = JSON.parse(xhr_cards.responseText);
        
        card_group_index = 0
        update_card_groups();
        
    }
};
function edit_card_group() {

    var i = card_group_index

    document.getElementById("popup-cards_group_edit-input").value = cards["groups"][i]["name"]
    show_popup_cards_group_edit()
    card_group_edit_temp = i;
};
function edit_card_group_confirm() {
    var requestValue = "http://localhost:8081/cards/groups?task=edit&index=" + card_group_edit_temp + "&name=" + document.getElementById("popup-cards_group_edit-input").value;

    
	xhr_cards.open("POST",requestValue);
    xhr_cards.send();

    hide_popup_cards_group_edit()
    xhr_cards.onload=function(){
        cards = JSON.parse(xhr_cards.responseText);
        
        update_card_groups();
    }
};

