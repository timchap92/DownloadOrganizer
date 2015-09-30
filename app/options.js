
// Saves options to chrome.storage.local
function save() {
    console.log('Saving settings')
    var domain = document.getElementById('domain').value;
    var alias = document.getElementById('alias').value;
    var nest = document.getElementById('nest').checked;
    var jsonObject = {};
    jsonObject[domain] = {alias: alias, nest: nest};
    chrome.storage.local.set(jsonObject, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        
        chrome.storage.local.get(domain, function (item) {
            status.textContent = item[domain].alias;
        });
        
        initialize();
    });
}



// Initializes the options form
function initialize() {
    //Clear all fields
    document.getElementById('domain').value = "";
    document.getElementById('alias').value = "";
    document.getElementById('nest').checked = false;

    //Fill in existing aliases
    chrome.storage.local.get(null, function (items) {
        var data = document.getElementById('data');
        var keys = Object.keys(items);
        var n = keys.length;
        var text = 'Data: (' + n + ' items)<br />Items: ' + items + '<br />';

        data.textContent = text;

        for (i = 0; i < n; i++) {
            var domain = keys[i];
            var item = items[keys[i]];
            var alias = item.alias;

            text += domain + ' --> ' + alias + '<br />';
            
        }

        
        data.innerHTML = text;

    });

}

function clear() {
    chrome.storage.local.clear(function () {
        initialize();

    });

    

}

document.addEventListener('DOMContentLoaded', initialize);
document.getElementById('save').addEventListener('click', save);
document.getElementById('clear').addEventListener('click', clear);
