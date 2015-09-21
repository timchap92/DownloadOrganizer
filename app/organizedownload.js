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

    return domain;
}

console.log("JavaScript loaded.");



chrome.downloads.onCreated.addListener(function (item) {
    console.log("Download has been created.");

    console.log("Referrer is: " + item.referrer);

    var domain = extractDomain(item.referrer);

    console.log("Domain is: " + domain);

    chrome.downloads.onDeterminingFilename.addListener(function (_item, __suggest) {
        console.log("Determing filename.");

        //Generate filepath
        var filepath = domain + "/" + _item.filename;

        //TODO: Sanitize filepath.

        //Suggest filename for this download.
        console.log("Suggesting filepath: " + filepath);
        __suggest({ filename: filepath });

    });
})
