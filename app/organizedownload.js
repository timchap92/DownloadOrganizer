
chrome.downloads.onDeterminingFilename.addListener(function (item, __suggest) {
    console.log('Determing filename.');
    console.log('Referrer is: ' + item.referrer);

    var domain = extractDomain(item.referrer);
    console.log('Domain is: ' + domain);

    //Does domain have an alias?
    chrome.storage.local.get(domain, function (aliasObject) {

        var folder;

        if (aliasObject) {
            console.log('Alias exists: ' + aliasObject.alias);
            folder = aliasObject.alias;
        } else {
            console.log('No alias exists');
            folder = domain;
        }

        //Generate filepath
        var filepath = folder + '/' + item.filename;

        //TODO: Sanitize filepath.

        //Suggest filename for this download.
        console.log('Suggesting filepath: ' + filepath);
        __suggest({ filename: filepath });

    });

    return true;

});

function extractDomain(url) {
    var domain;
    //Find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf('://') > -1) {
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

//Stores the alias object
function storeAliasObject(string, obj) {
    var key = string;
    var value = obj;
    var jsonfile = {};
    jsonfile[key] = value;
    chrome.storage.local.set(jsonfile, function () {

    });

}

//Retrieves the alias object
function getAliasObjectAndSuggest(string) {
    chrome.storage.local.get(string, function (obj) {
        
        var filepath;

        if (obj) {
            //Alias exists for this domain
            calculateFilepath(obj);
        } else {
            //No alias exists, use default option

        }
    });
}