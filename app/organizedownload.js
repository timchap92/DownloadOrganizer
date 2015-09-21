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
    
    domain.pop;
    domain = domain.pop;

    return domain;
}

chrome.downloads.onDeterminingFilename.addListener(function (item, __suggest) {
    console.log("Download has been triggered.");

    console.log(item.id);

    //Generate filepath
    var filepath = extractDomain(item.referrer) + "/" + item.filename;

    //TODO: Sanitize filepath.

    //Suggest filename for this download.
    console.log("Suggesting filepath: " + filepath);
    __suggest({ filename: filepath });

    
    

});
