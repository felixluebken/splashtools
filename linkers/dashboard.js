var captcha_accounts;
var stats_profiles;
var stats_cards;

let xhr_dashboard = new XMLHttpRequest();
let xhr_stats_accounts = new XMLHttpRequest();
let xhr_stats_profiles = new XMLHttpRequest();
let xhr_stats_cards = new XMLHttpRequest();
let xhr_changelog = new XMLHttpRequest();


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

window.addEventListener("load", function(){
    update_dashboard();
    get_changelog_info();


    display_dashboard_elements()
});


function update_dashboard(){
    get_captcha_overview_groups()
    get_statistics_info()
}

function get_captcha_overview_groups() {
	xhr_dashboard.open("GET","http://localhost:8081/captcha/groups",true);
    xhr_dashboard.send();
    
    xhr_dashboard.onload=function(){
        captcha_accounts = JSON.parse(xhr_dashboard.responseText);
        console.log(xhr_dashboard.responseText)
        update_captcha_overview_table()
    }
};

function update_captcha_overview_table() {
    var table = document.getElementById("dashboard_captcha-main_table");


    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    for(var i in captcha_accounts["groups"]) {
        for(var j in captcha_accounts["groups"][i]["accounts"]) {
            var row = table.insertRow(table.rows.length);
            var email = row.insertCell(0);
            var score_level = row.insertCell(1);

            email.setAttribute("class","dashboard_td")
            score_level.setAttribute("class","dashboard_td")
            
            //EMAIL UPDATE
            email.innerHTML = captcha_accounts["groups"][i]["accounts"][j]["email"];
    
            //SCORE UPDATE
            var score = captcha_accounts["groups"][i]["accounts"][j]["score"];
            var score_div = document.createElement('div');
            var score_style = 'background: url("../pages/style/images/v3-score-none.png");height: 5px;width: 165px;';
            if(score == "0"){
                score_style = 'background: url("../pages/style/images/v3-score-none.png");height: 5px;width: 165px;'
    
            } else if(score == "0.1" || score == "0.2" || score == "0.3" || score == "0.4"){
                score_style = 'background: url("../pages/style/images/v3-score-low.png");height: 5px;width: 165px;'
    
            } else if(score == "0.5" || score == "0.6" || score == "0.7" || score == "0.8"){
                score_style = 'background: url("../pages/style/images/v3-score-medium.png");height: 5px;width: 165px;'
    
            } else if(score == "0.9"){
                score_style = 'background: url("../pages/style/images/v3-score-high.png");height: 5px;width: 165px;'
    
            };
            score_div.setAttribute('style',score_style);
            score_level.appendChild(score_div)
    
    
        }
        
    }
    
};



function get_changelog_info() {
    var panel = document.getElementById("dashboard_updater_changelog_panel");


    while(panel.hasChildNodes())
    {
        panel.removeChild(panel.firstChild);
    }

    xhr_changelog.open("GET","http://localhost:8081/changelog",true);
    xhr_changelog.send();
    
    xhr_changelog.onload=function(){
        var changes = JSON.parse(xhr_changelog.responseText);
        for(var i in changes) {
            var title = document.createElement("div")
            var title_date = document.createElement("span")
            var title_version = document.createElement("span")
            var changes_list = document.createElement("ul")
            var divider = document.createElement("div")

            title.setAttribute("class","dashboard_changelog-title")

            title_date.setAttribute("class","dashboard_changelog-text")
            title_date.innerHTML = changes[i]["date"]

            title_version.setAttribute("class","dashboard_changelog-text")
            title_version.innerHTML = changes[i]["version"]
            if(i == 0) {
                title_version.setAttribute("style","color:#49B3A8;")
            } else {
                title_version.setAttribute("style","color:#FA5677;")
            }

            divider.setAttribute("class","dashboard_changelog-divider")

            for(var j in changes[i]["features"]){
                var changes_item = document.createElement("li")
                changes_item.innerHTML = changes[i]["features"][j]

                changes_list.appendChild(changes_item)
            }

            title.appendChild(title_date)
            title.appendChild(title_version)

            panel.appendChild(title)
            panel.appendChild(changes_list)
            if(i != changes.length-1 || i == 0){
                panel.appendChild(divider)
            }   
            

        }
    }
}

async function get_statistics_info() {
    xhr_stats_accounts.open("GET","http://localhost:8081/captcha/groups",true);
    xhr_stats_accounts.send();
    
    xhr_stats_accounts.onload=function(){
        captcha_accounts = JSON.parse(xhr_stats_accounts.responseText);

        var account_count = 0;
        for(var i in captcha_accounts["groups"]) {
            for(var j in captcha_accounts["groups"][i]["accounts"]) {
                account_count++
            }
        }

        document.getElementById("dashboard_statistics-gmails").innerHTML = account_count
    }

    xhr_stats_profiles.open("GET","http://localhost:8081/profiles/groups",true);
    xhr_stats_profiles.send();
    
    xhr_stats_profiles.onload=function(){
        stats_profiles = JSON.parse(xhr_stats_profiles.responseText);

        var profile_count = 0;
        for(var i in stats_profiles["groups"]) {
            for(var j in stats_profiles["groups"][i]["profiles"]) {
                profile_count++
            }
        }

        document.getElementById("dashboard_statistics-profiles").innerHTML = profile_count
    }

    xhr_stats_cards.open("GET","http://localhost:8081/cards/groups",true);
    xhr_stats_cards.send();
    
    xhr_stats_cards.onload=function(){
        stats_cards = JSON.parse(xhr_stats_cards.responseText);

        var card_count = 0;
        for(var i in stats_cards["groups"]) {
            for(var j in stats_cards["groups"][i]["cards"]) {
                card_count++
            }
        }

        document.getElementById("dashboard_statistics-cards").innerHTML = card_count
    }
}


async function display_dashboard_elements() {

    document.getElementById("dashboard_info_group-top").style.visibility = "visible";
    document.getElementById("dashboard_info_group-top").style.opacity = "1";

    await sleep(200)

    document.getElementById("dashboard_info_group-bottom").style.visibility = "visible";
    document.getElementById("dashboard_info_group-bottom").style.opacity = "1";

    await sleep(200)

    document.getElementById("dashboard_update_group").style.visibility = "visible";
    document.getElementById("dashboard_update_group").style.opacity = "1";

}
