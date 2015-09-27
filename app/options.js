
// Saves options to chrome.storage.local
function save() {
    alert('Hello!');
    console.log('Saving settings')
    var domain = document.getElementById('domain').value;
    var alias = document.getElementById('alias').value;
    var nest = document.getElementById('nest').checked;
    chrome.storage.local.set({
        domain: {alias: alias, nest: nest}
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
        console.log('Settings saved')
    });
}



// Clears all fields
function restore() {
    document.getElementById('domain').value = "";
    document.getElementById('alias').value = "";
}
document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click',
    save);