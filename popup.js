function click(e) {
    debugger;
    chrome.tabs.executeScript(null, {
        file: "custom.js"
    });
}


document.addEventListener('DOMContentLoaded', function() {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
