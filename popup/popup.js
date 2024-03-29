Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

const StorageAreaSync = chrome.storage.sync;
const StorageAreaLocal = chrome.storage.local;

//console = chrome.extension.getBackgroundPage().console;

/*var loadList = function(){
    chrome.extension.getBackgroundPage().loadList();
};*/

/*function removeFavourite(id){
    console.log(chrome.extension.getViews()); //..removeFavouriteContent(id);
}/**/

function has(obj, value)
{
    for (var id in obj)
    {
        if (obj[id] == value)
        {
            return true;
        }
    }
    return false;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function OpenInNewTab(url)
{
    chrome.tabs.create(
        {
            'url': url,
            'active': false
        }
    );
    //var win = window.open(url, '_blank');
    //win.focus();
}


function retrieve(name)
{
    StorageAreaSync.get(null, function (data)
    {
        console.log(name + ": " + data[name]);
        if (!data[name])
        {
            console.log(name + ": " + data[name]);
            document.getElementById(name).removeAttribute("checked");
        }
    });
}

var permanentLinkToggle;
function permanentLinkCheckboxToggled()
{
    var checkbox = document.getElementById('permanentLinkToggle').checked;
    if (!checkbox)
    {
        console.log('<br>permanentLinkToggle: off');
        document.getElementById('permanentLinkToggle').removeAttribute("checked");
        permanentLinkToggle = false;
    }
    else
    {
        console.log('<br>permanentLinkToggle: on');
        document.getElementById('permanentLinkToggle').setAttribute("checked", "");
        permanentLinkToggle = true;
    }
    StorageAreaSync.set({'permanentLinkToggle': permanentLinkToggle});
}

var imageLinkToggle;
function imageLinkToggleCheckboxToggled()
{
    var checkbox = document.getElementById('imageLinkToggle').checked;
    if (!checkbox)
    {
        console.log('<br>imageLinkToggle: off');
        document.getElementById('imageLinkToggle').removeAttribute("checked");
        imageLinkToggle = false;
    }
    else
    {
        console.log('<br>imageLinkToggle: on');
        document.getElementById('imageLinkToggle').setAttribute("checked", "");
        imageLinkToggle = true;
    }
    StorageAreaSync.set({'imageLinkToggle': imageLinkToggle});
}

var explainLinkToggle;
function explainLinkToggleCheckboxToggled()
{
    var checkbox = document.getElementById('explainLinkToggle').checked;
    if (!checkbox)
    {
        console.log('<br>explainLinkToggle: off');
        document.getElementById('explainLinkToggle').removeAttribute("checked");
        explainLinkToggle = false;
    }
    else
    {
        console.log('<br>explainLinkToggle: on');
        document.getElementById('explainLinkToggle').setAttribute("checked", "");
        explainLinkToggle = true;
    }
    StorageAreaSync.set({'explainLinkToggle': explainLinkToggle});
}

var Link3DToggle;
function Link3DToggleCheckboxToggled()
{
    var checkbox = document.getElementById('Link3DToggle').checked;
    if (!checkbox)
    {
        console.log('<br>Link3DToggle: off');
        document.getElementById('Link3DToggle').removeAttribute("checked");
        Link3DToggle = false;
    }
    else
    {
        console.log('<br>Link3DToggle: on');
        document.getElementById('Link3DToggle').setAttribute("checked", "");
        Link3DToggle = true;
    }
    StorageAreaSync.set({'Link3DToggle': Link3DToggle});
}

var titleTextMover;
function titleTextMoverToggled()
{
    var checkbox = document.getElementById('titleTextMover').checked;
    if (!checkbox)
    {
        console.log('<br>titleTextMover: off');
        document.getElementById('titleTextMover').removeAttribute("checked");
        titleTextMover = false;
    }
    else
    {
        console.log('<br>titleTextMover: on');
        document.getElementById('titleTextMover').setAttribute("checked", "");
        titleTextMover = true;
    }
    StorageAreaSync.set({'titleTextMover': titleTextMover});
}

var fixRandom;
function fixRandomToggled()
{
    var checkbox = document.getElementById('fixRandom').checked;
    if (!checkbox)
    {
        console.log('<br>fixRandom: off');
        document.getElementById('fixRandom').removeAttribute("checked");
        fixRandom = false;
    }
    else
    {
        console.log('<br>fixRandom: on');
        document.getElementById('fixRandom').setAttribute("checked", "");
        fixRandom = true;
    }
    StorageAreaSync.set({'fixRandom': fixRandom});
}

var favouritesButton;
function favouritesButtonToggle()
{
    var checkbox = document.getElementById('favouritesButtonToggle').checked;
    if (!checkbox)
    {
        console.log('<br>favouritesButton: off');
        document.getElementById('favouritesButtonToggle').removeAttribute("checked");
        favouritesButton = false;
    }
    else
    {
        console.log('<br>favouritesButton: on');
        document.getElementById('favouritesButtonToggle').setAttribute("checked", "");
        favouritesButton = true;
    }
    StorageAreaSync.set({'favouritesButtonToggle': favouritesButton});
}

var keyboardNavigation;
function keyboardNavigationToggled()
{
    var checkbox = document.getElementById('keyboardNavigation').checked;
    if (!checkbox)
    {
        console.log('<br>keyboardNavigation: off');
        document.getElementById('keyboardNavigation').removeAttribute("checked");
        keyboardNavigation = false;
    }
    else
    {
        console.log('<br>keyboardNavigation: on');
        document.getElementById('keyboardNavigation').setAttribute("checked", "");
        keyboardNavigation = true;
    }
    StorageAreaSync.set({'keyboardNavigation': keyboardNavigation});
}

var arrowNavigation;
function arrowNavigationToggled()
{
    var checkbox = document.getElementById('arrowNavigation').checked;
    if (!checkbox)
    {
        console.log('<br>arrowNavigation: off');
        document.getElementById('arrowNavigation').removeAttribute("checked");
        arrowNavigation = false;
    }
    else
    {
        console.log('<br>arrowNavigation: on');
        document.getElementById('arrowNavigation').setAttribute("checked", "");
        arrowNavigation = true;
    }
    StorageAreaSync.set({'arrowNavigation': arrowNavigation});
}

/*var newBadge;
function newBadgeToggled() {
    var checkbox = document.getElementById('newBadge').checked;
    if (!checkbox) {
        console.log('<br>newBadge: off');
        document.getElementById('newBadge').removeAttribute("checked");
        newBadge = false;
    } else {
        console.log('<br>newBadge: on');
        document.getElementById('newBadge').setAttribute("checked", "");
        newBadge = true;
    }
    StorageAreaSync.set({'newBadge': newBadge});
}

var newNotification;
function newNotificationToggled() {
    var checkbox = document.getElementById('newNotification').checked;
    if (!checkbox) {
        console.log('<br>newNotification: off');
        document.getElementById('newNotification').removeAttribute("checked");
        newNotification = false;
    } else {
        console.log('<br>newNotification: on');
        document.getElementById('newNotification').setAttribute("checked", "");
        newNotification = true;
    }
    StorageAreaSync.set({'newNotification': newNotification});
}*/

function clearHistory()
{
    console.log('history cleared');
    StorageAreaSync.set({'history': []});
}

function clearAllFavourites()
{
    StorageAreaSync.set({'favourites': []});
    while (document.getElementById('favourites').hasChildNodes())
    {
        document.getElementById('favourites').removeChild(document.getElementById('favourites').lastChild);
    }
}

function openAllFavourites()
{
    StorageAreaSync.get(null, function (data)
    {
        console.log(data);
        for (var i = 0; i < data['favourites'].length; i++)
        {
            OpenInNewTab('http://xkcd.com/' + data['favourites'][i] + '/')
        }
    });
}

function removeFavourites(data1)
{
    var id = data1['data'];
    console.log(id);

    document.getElementById('favourites').removeChild(document.getElementById(id));

    StorageAreaSync.get(null, function (data)
    {
        var favouritesList = [];
        favouritesList = favouritesList.concat(data['favourites']);
        favouritesList.remove(id);
        StorageAreaSync.set({'favourites': favouritesList});
    });
}

function fixRandomLink(historyList, favouritesList)
{
    var list = historyList.concat(favouritesList);
    $.getJSON("http://xkcd.com/info.0.json", function (latest)
    {
        const latestId = latest["num"];
        var isNew = false;

        while (!isNew)
        {
            var random = getRndInteger(1,latestId);
            if (!has(list, random) && !(random == 404))
            {
                document.getElementById('random').setAttribute('href', 'http://xkcd.com/' + random + '/');
                isNew = true;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function ()
{
    console.log('loaded');

    /*function search() {
        StorageAreaLocal.get(null, function (data) {
            var noResults;
            try {
                var comicList = data['comicList'];
                //console.log(comicList);
                while (document.getElementById('searchResultsOuter').hasChildNodes()) {
                    document.getElementById('searchResultsOuter').removeChild(document.getElementById('searchResultsOuter').lastChild);
                }
                var searchTerm = document.getElementById("SearchField").value.toLocaleLowerCase();
                console.log(searchTerm);
                var results = document.createElement("div");
                document.getElementById('searchResultsOuter').appendChild(results);
                document.getElementById('searchResultsOuter').lastElementChild.outerHTML = '<details open><summary class="searchResults">Search Results</summary><div id="searchResults"></div></details>';
                for (var i = 0; i < comicList.length; i++) {
                    if (~comicList[i].toLocaleLowerCase().indexOf(searchTerm)) {
                        var searchID = comicList[i].replace(/(_[\s\S]*)$/g, '');
                        var searchName = comicList[i].replace('_', ': ');
                        searchName = searchName.replace(/_[\s\S]*$/g, '');
                        console.log(searchName);
                        var para = document.createElement("div");
                        document.getElementById('searchResults').appendChild(para);

                        document.getElementById('searchResults').lastElementChild.outerHTML = '<a id="searchResultsLink' + i + '" title="' + searchName + '" href="http://xkcd.com/' + searchID + '/" target="_blank" class="favouritesLinks">' + searchName + '</a><br id="searchResultsBreak' + i + '">';
                    }
                }
                if (document.getElementById('searchResults').childElementCount == 0) {
                    noResults = document.createElement("div");
                    document.getElementById('searchResults').appendChild(noResults);

                    document.getElementById('searchResults').lastElementChild.outerHTML = 'No comics found for the search term "' + searchTerm + '". Please try another search.';
                }
            } catch (e) {
                noResults = document.createElement("div");
                document.getElementById('searchResults').appendChild(noResults);

                document.getElementById('searchResults').lastElementChild.outerHTML = 'Comic list not loaded. Please reload list';
            }
        });
    }*/

    $("#clearHistory").click(clearHistory);
    $("#openAllFavourites").click(openAllFavourites);
    $("#clearAllFavourites").click(clearAllFavourites);

    /*$("#SearchButton").click(search);
    $("#SearchField").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#SearchButton").click();
            return false;
        }
    });
    $("#reloadButton").click(loadList);*/

    $('#importExport').click(function ()
    {
        chrome.runtime.openOptionsPage()
    });

    retrieve('permanentLinkToggle');
    retrieve('imageLinkToggle');
    retrieve('explainLinkToggle');
    retrieve('Link3DToggle');
    retrieve('titleTextMover');
    retrieve('fixRandom');
    retrieve('favouritesButtonToggle');
    /*retrieve('newBadge');
    retrieve('newNotification');*/
    retrieve('keyboardNavigation');
    retrieve('arrowNavigation');

    document.getElementById('permanentLinkToggle').addEventListener('change', permanentLinkCheckboxToggled);
    document.getElementById('imageLinkToggle').addEventListener('change', imageLinkToggleCheckboxToggled);
    document.getElementById('explainLinkToggle').addEventListener('change', explainLinkToggleCheckboxToggled);
    document.getElementById('Link3DToggle').addEventListener('change', Link3DToggleCheckboxToggled);
    document.getElementById('titleTextMover').addEventListener('change', titleTextMoverToggled);
    document.getElementById('favouritesButtonToggle').addEventListener('change', favouritesButtonToggle);
    document.getElementById('fixRandom').addEventListener('change', fixRandomToggled);
    document.getElementById('keyboardNavigation').addEventListener('change', keyboardNavigationToggled);
    document.getElementById('arrowNavigation').addEventListener('change', arrowNavigationToggled);
    /*document.getElementById('newBadge').addEventListener('change', newBadgeToggled);
    document.getElementById('newNotification').addEventListener('change', newNotificationToggled);*/

    StorageAreaSync.get(null, function (syncData)
    {
        fixRandomLink(syncData['history'], syncData['favourites']);

        for (var i = 0; i < syncData['favourites'].length; i++)
        {
            var id = syncData['favourites'][i];
            var element = document.createElement("li");
            element.id = id.toString();
            $('#favourites').append(element);
        }

        for (var j = 0; j < syncData['favourites'].length; j++)
        {
            $.getJSON("http://xkcd.com/" + syncData['favourites'][j] + "/info.0.json", function (data)
            {
                var id = data["num"];
                var name = data["title"];
                $('#'+id).html('<button id="deleteButton" class="button deleteButton" title="Remove comic \'' + id + ': ' + name + '\' from your favourites">&#9003;</button><a id="favouriteLink" title="' + id + ': ' + name + '" href="http://xkcd.com/' + id + '/" target="_blank" class="favouritesLinks">' + id + ': ' + name + '</a>');
                $('#'+id+' > #deleteButton').click(id, removeFavourites);
            });
        }
        //for (var i = 0; i < data['favourites'].length; i++)
        //{
            //$('#deleteButton' + i).click(removeFavourites);
        //}
    });
});
