function handler() {
    let source = document.getElementById("registerInput").value;
    document.getElementById("register").innerText = source;
    document.getElementById("registerkg").innerText = source;
}
function keyHandle(event) {
    event = (event || window.event);
    var key = event.which || event.keyCode; // keyCode detection
    var ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17) ? true : false); // ctrl detection
    if (key == 123) {
        event.preventDefault();
        return false;
    } else
        if (ctrl && (key == 85 || key == 83)) {
            event.preventDefault();
            return false;
        }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("registerChange").addEventListener("click", handler, false);
});


document.onkeypress = function (event) {
    keyHandle(event)
}
document.onmousedown = function (event) {
    keyHandle(event)
}
document.onkeydown = function (event) {
    keyHandle(event)
}



///////////////////
function copyMe() {
    try {
        document.execCommand("copy")
    }
    catch {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", window.getSelection().toString());
    }
}
function pasteMe(evt) {
    clipdata = evt.clipboardData || window.clipboardData;
    if (clipdata) {
        document.getElementById('registerInput').value = clipdata.getData("Text");
    }
}
function searchMe() {
    query = window.getSelection().toString();
    // query = window.clipboardData.getData('Text');
    url = 'http://www.google.com/search?q=' + query;
    window.open(url, '_blank');
}

document.addEventListener('paste', function (evt) {
    clipdata = evt.clipboardData || window.clipboardData;
    if (clipdata) {
        document.getElementById('registerInput').value = clipdata.getData("Text");
    }
});