
chrome.downloads.onDeterminingFilename.addListener(function (item, __suggest) {
    console.log('Download triggered.');

    var originalUrl = item.referrer;
    console.log('Referrer is: ' + originalUrl);

    var originalUrlObject = parseUrl(originalUrl);

    iterativelyFindExistingAliasAndSuggest(originalUrlObject);

    return true;

    function iterativelyFindExistingAliasAndSuggest(urlObject)
    {
        var url = convertToString(urlObject);

        console.log('Searching for record matching: ' + url);
        chrome.storage.local.get(url, function (aliasObject)
        {

            if (Object.keys(aliasObject).length != 0)
            {
                console.log('Found item: ' + JSON.stringify(aliasObject, null, 4));
                var alias = aliasObject[url].alias;
                console.log('Found alias: ' + alias);

                suggestFilepath(alias, item.filename);

            } else
            {
                console.log('No item found. Reducing specification.');
                urlObject = reduceDomain(urlObject);
                if (urlObject != null)
                {
                    iterativelyFindExistingAliasAndSuggest(urlObject);
                } else
                {
                    console.log('Cannot reduce specification any further. Calculating default path.');
                    suggestFilepath(getDefaultFolderPath(originalUrlObject), item.filename);
                }
            }
        });
    }

    //Constructs the full filepath and uses to passed function to proceed with the download
    function suggestFilepath(parentPath, filename)
    {
        var filepath = parentPath + '/' + filename;
        console.log('Downloading to path: ' + filepath);

        __suggest({ filename: filepath });
    }
        
        
});




//Finds a 'less specified' domain for the given domain object
function reduceDomain(urlObject)
{
    var path = urlObject.path;
    var length = path.length;

    if (length > 0)
    {
        //Reduce path
        urlObject.path = path.slice(0, length - 1);
    } else
    {
        if (urlObject.subdomain != '')
        {
            //Remove subdomain
            urlObject.subdomain = '';
        } else
        {
            urlObject = null;
        }
    }

    return urlObject;

}

//Calculates the default folder path for this domain object
function getDefaultFolderPath(urlObject) {
    //TODO change this based on user preference
    //return convertToString(urlObject);
    return urlObject.domain;
}

//Converts a domain object to its string representation (i.e. URL)
function convertToString(urlObject) {
    var pathString = '';
    var path = urlObject.path;
    var pathLength = urlObject.path.length;

    for (i = 0; i < pathLength; i++) {
        pathString += '/' + path[i];
    }

    var result = (urlObject.domain + '.' +
        urlObject.extension)

    //Prepend the subdomain, if one exists
    var subdomain = urlObject.subdomain;
    if (subdomain != '') {
        result = subdomain + '.' + result;
    }

    //Append the path, if one exists
    if (pathString != '') {
        result = result + pathString;
    }

    return result;
        
}

//Extracts a domain object from the passed URL strings
function parseUrl(url) {
    
    var subdomain
    var domain;
    var extension;
    var path;

    //Find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf('://') > -1) {
        url = url.split('/')
        path = url.slice(3, url.length);
        url = url[2];
    }
    else {
        url = url.split('/');
        path = url.slice(1, url.length);
        url = url[0];
    }

    console.log(path);

    //Find & remove port number
    url = url.split(':')[0];

    //TODO: Fix this
    url = url.split('\.');

    var length = url.length;

    extension = url[length - 1];
    domain = url[length - 2];

    if (length > 2) {
        subdomain = url[url.length - 3];
    } else {
        subdomain = "";
    }

    urlObject = {
        subdomain: subdomain,
        domain: domain,
        extension: extension,
        path: path
    };

    console.log('Parsed URL: ' +
        JSON.stringify(urlObject, null, 4));

    return urlObject;
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