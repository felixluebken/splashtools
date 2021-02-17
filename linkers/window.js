const remote = require('electron').remote;


var z = 10

function minimize_window() {
    var window = remote.getCurrentWindow()
    window.minimize()
}

function close_window() {
    var window = remote.getCurrentWindow()
    window.close()
}




window.addEventListener("load", function(){
    document.getElementById("menu_item-dashboard").style.color= 'white';

    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("menu").style.opacity = "1";

    document.getElementById("menu_logo").style.visibility = "visible";
    document.getElementById("menu_logo").style.opacity = "1";
})


async function open_dashboard() {
    z++
    document.getElementById("dashboard_page").style.zIndex = z
    
    document.getElementById("dashboard_page").style.visibility='visible';
    document.getElementById("captcha_page").style.visibility='none';
    document.getElementById("profiles_page").style.visibility='none';
    document.getElementById("cards_page").style.visibility='none';
    
    document.getElementById("dashboard_page").style.opacity='1';
    document.getElementById("captcha_page").style.opacity='0';
    document.getElementById("profiles_page").style.opacity='0';
    document.getElementById("cards_page").style.opacity='0';
    
    document.getElementById("menu_marker").style.left= '116px';
    document.getElementById("menu_marker").style.width= '110px';

    document.getElementById("menu_item-dashboard").style.color= 'white';
    document.getElementById("menu_item-captcha").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-profiles").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-cards").style.color= 'rgba(255, 255, 255, 0.5)';
    /*
    document.getElementById("dashboard_page").style.display='block';
    document.getElementById("captcha_page").style.display='none';
    document.getElementById("profiles_page").style.display='none';
    document.getElementById("cards_page").style.display='none';
    */
}
async function open_captcha() {
    z++
    document.getElementById("captcha_page").style.zIndex = z

    /*
    document.getElementById("dashboard_page").style.display='none';
    document.getElementById("captcha_page").style.display='block';
    document.getElementById("profiles_page").style.display='none';
    document.getElementById("cards_page").style.display='none';
    */


    document.getElementById("dashboard_page").style.visibility='none';
    document.getElementById("captcha_page").style.visibility='visible';
    document.getElementById("profiles_page").style.visibility='none';
    document.getElementById("cards_page").style.visibility='none';

    document.getElementById("dashboard_page").style.opacity='0';
    document.getElementById("captcha_page").style.opacity='1';
    document.getElementById("profiles_page").style.opacity='0';
    document.getElementById("cards_page").style.opacity='0';

    document.getElementById("menu_marker").style.left= '264px';
    document.getElementById("menu_marker").style.width= '84px';

    document.getElementById("menu_item-dashboard").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-captcha").style.color= 'white';
    document.getElementById("menu_item-profiles").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-cards").style.color= 'rgba(255, 255, 255, 0.5)';
}
async function open_profiles() {
    z++
    document.getElementById("profiles_page").style.zIndex = z
    /*
    document.getElementById("dashboard_page").style.display='none';
    document.getElementById("captcha_page").style.display='none';
    document.getElementById("profiles_page").style.display='block';
    document.getElementById("cards_page").style.display='none';
    */
    document.getElementById("dashboard_page").style.visibility='none';
    document.getElementById("captcha_page").style.visibility='none';
    document.getElementById("profiles_page").style.visibility='visible';
    document.getElementById("cards_page").style.visibility='none';

    document.getElementById("dashboard_page").style.opacity='0';
    document.getElementById("captcha_page").style.opacity='0';
    document.getElementById("profiles_page").style.opacity='1';
    document.getElementById("cards_page").style.opacity='0';

    document.getElementById("menu_marker").style.left= '380px';
    document.getElementById("menu_marker").style.width= '84px';

    document.getElementById("menu_item-dashboard").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-captcha").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-profiles").style.color= 'white';
    document.getElementById("menu_item-cards").style.color= 'rgba(255, 255, 255, 0.5)';
}
async function open_cards() {
    z++
    document.getElementById("cards_page").style.zIndex = z

    /*
    document.getElementById("dashboard_page").style.display='none';
    document.getElementById("captcha_page").style.display='none';
    document.getElementById("profiles_page").style.display='none';
    document.getElementById("cards_page").style.display='block';
    */
    document.getElementById("dashboard_page").style.visibility='none';
    document.getElementById("captcha_page").style.visibility='none';
    document.getElementById("profiles_page").style.visibility='none';
    document.getElementById("cards_page").style.visibility='visible';

    document.getElementById("dashboard_page").style.opacity='0';
    document.getElementById("captcha_page").style.opacity='0';
    document.getElementById("profiles_page").style.opacity='0';
    document.getElementById("cards_page").style.opacity='1';

    document.getElementById("menu_marker").style.left= '495px';
    document.getElementById("menu_marker").style.width= '60px';

    document.getElementById("menu_item-dashboard").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-captcha").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-profiles").style.color= 'rgba(255, 255, 255, 0.5)';
    document.getElementById("menu_item-cards").style.color= 'white';
}
