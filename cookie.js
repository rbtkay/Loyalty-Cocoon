function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
    } else {
        username = prompt('Please sign in to continue', '');
    }
}

function deleteCookie() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "address=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "balance=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "isVerified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

module.exports.setCookie = setCookie;
module.exports.getCookie = getCookie;
module.exports.checkCookie = checkCookie;
module.exports.deleteCookie = deleteCookie;
