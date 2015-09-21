function extractDomain(url) {
    var domain;
    //Find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //Find & remove port number
    domain = domain.split(':')[0];

    //TODO: Fix this
    domain = domain.split('\.');

    domain = domain[domain.length - 2];

    return domain;
}

console.log("JavaScript loaded.");

chrome.downloads.onDeterminingFilename.addListener(function (item, __suggest) {
    console.log("Determing filename.");
    console.log("Referrer is: " + item.referrer);

    var domain = extractDomain(item.referrer);
    console.log("Domain is: " + domain);

    //Generate filepath
    var filepath = domain + "/" + item.filename;

    //TODO: Sanitize filepath.

    //Suggest filename for this download.
    console.log("Suggesting filepath: " + filepath);
    __suggest({ filename: filepath });

});