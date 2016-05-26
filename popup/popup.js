var StorageAreaLocal = chrome.storage.local;
var StorageAreaSync = chrome.storage.sync;

console = chrome.extension.getBackgroundPage().console;

var loadList = function(){
    chrome.extension.getBackgroundPage().loadList();
};

function has(obj, value) {
    for (var id in obj) {
        if (obj[id] == value) {
            return true;
        }
    }
    return false;
}

function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}


function retrieve(name) {
    StorageAreaSync.get(null, function (data) {
        console.log(data[name]);
        if (!data[name]) {
            document.getElementById(name).removeAttribute("checked");
            if (name == 'keyboardNavigation') {
                document.getElementById('arrowNavigation').disabled = true;
            }
        }
    });
}

var permanentLinkToggle;
function permanentLinkCheckboxToggled() {
    var checkbox = document.getElementById('permanentLinkToggle').checked;
    if (!checkbox) {
        console.log('<br>permanentLinkToggle: off');
        document.getElementById('permanentLinkToggle').removeAttribute("checked");
        permanentLinkToggle = false;
    } else {
        console.log('<br>permanentLinkToggle: on');
        document.getElementById('permanentLinkToggle').setAttribute("checked", "");
        permanentLinkToggle = true;
    }
    StorageAreaSync.set({'permanentLinkToggle': permanentLinkToggle});
}

var imageLinkToggle;
function imageLinkToggleCheckboxToggled() {
    var checkbox = document.getElementById('imageLinkToggle').checked;
    if (!checkbox) {
        console.log('<br>imageLinkToggle: off');
        document.getElementById('imageLinkToggle').removeAttribute("checked");
        imageLinkToggle = false;
    } else {
        console.log('<br>imageLinkToggle: on');
        document.getElementById('imageLinkToggle').setAttribute("checked", "");
        imageLinkToggle = true;
    }
    StorageAreaSync.set({'imageLinkToggle': imageLinkToggle});
}

var explainLinkToggle;
function explainLinkToggleCheckboxToggled() {
    var checkbox = document.getElementById('explainLinkToggle').checked;
    if (!checkbox) {
        console.log('<br>explainLinkToggle: off');
        document.getElementById('explainLinkToggle').removeAttribute("checked");
        explainLinkToggle = false;
    } else {
        console.log('<br>explainLinkToggle: on');
        document.getElementById('explainLinkToggle').setAttribute("checked", "");
        explainLinkToggle = true;
    }
    StorageAreaSync.set({'explainLinkToggle': explainLinkToggle});
}

var Link3DToggle;
function Link3DToggleCheckboxToggled() {
    var checkbox = document.getElementById('Link3DToggle').checked;
    if (!checkbox) {
        console.log('<br>Link3DToggle: off');
        document.getElementById('Link3DToggle').removeAttribute("checked");
        Link3DToggle = false;
    } else {
        console.log('<br>Link3DToggle: on');
        document.getElementById('Link3DToggle').setAttribute("checked", "");
        Link3DToggle = true;
    }
    StorageAreaSync.set({'Link3DToggle': Link3DToggle});
}

var titleTextMover;
function titleTextMoverToggled() {
    var checkbox = document.getElementById('titleTextMover').checked;
    if (!checkbox) {
        console.log('<br>titleTextMover: off');
        document.getElementById('titleTextMover').removeAttribute("checked");
        titleTextMover = false;
    } else {
        console.log('<br>titleTextMover: on');
        document.getElementById('titleTextMover').setAttribute("checked", "");
        titleTextMover = true;
    }
    StorageAreaSync.set({'titleTextMover': titleTextMover});
}

var fixRandom;
function fixRandomToggled() {
    var checkbox = document.getElementById('fixRandom').checked;
    if (!checkbox) {
        console.log('<br>fixRandom: off');
        document.getElementById('fixRandom').removeAttribute("checked");
        fixRandom = false;
    } else {
        console.log('<br>fixRandom: on');
        document.getElementById('fixRandom').setAttribute("checked", "");
        fixRandom = true;
    }
    StorageAreaSync.set({'fixRandom': fixRandom});
}

var favouritesButton;
function favouritesButtonToggle() {
    var checkbox = document.getElementById('favouritesButtonToggle').checked;
    if (!checkbox) {
        console.log('<br>favouritesButton: off');
        document.getElementById('favouritesButtonToggle').removeAttribute("checked");
        favouritesButton = false;
    } else {
        console.log('<br>favouritesButton: on');
        document.getElementById('favouritesButtonToggle').setAttribute("checked", "");
        favouritesButton = true;
    }
    StorageAreaSync.set({'favouritesButtonToggle': favouritesButton});
}

var keyboardNavigation;
function keyboardNavigationToggled() {
    var checkbox = document.getElementById('keyboardNavigation').checked;
    if (!checkbox) {
        console.log('<br>keyboardNavigation: off');
        document.getElementById('keyboardNavigation').removeAttribute("checked");
        document.getElementById('arrowNavigation').disabled = true;
        keyboardNavigation = false;
    } else {
        console.log('<br>keyboardNavigation: on');
        document.getElementById('keyboardNavigation').setAttribute("checked", "");
        document.getElementById('arrowNavigation').disabled = false;
        keyboardNavigation = true;
    }
    StorageAreaSync.set({'keyboardNavigation': keyboardNavigation});
}

var arrowNavigation;
function arrowNavigationToggled() {
    var checkbox = document.getElementById('arrowNavigation').checked;
    if (!checkbox) {
        console.log('<br>arrowNavigation: off');
        document.getElementById('arrowNavigation').removeAttribute("checked");
        arrowNavigation = false;
    } else {
        console.log('<br>arrowNavigation: on');
        document.getElementById('arrowNavigation').setAttribute("checked", "");
        arrowNavigation = true;
    }
    StorageAreaSync.set({'arrowNavigation': arrowNavigation});
}


function clearHistory() {
    console.log('history cleared');
    StorageAreaLocal.set({'history': []});
}

function clearAllFavourites() {
    StorageAreaLocal.set({'favouritesID': []});
    StorageAreaLocal.set({'favouritesName': []});
    while (document.getElementById('favourites').hasChildNodes()) {
        document.getElementById('favourites').removeChild(document.getElementById('favourites').lastChild);
    }
}

function openAllFavourites() {
    StorageAreaLocal.get(null, function (data) {
        for (var i = 0; i < data['favouritesID'].length; i++) {
            OpenInNewTab('http://xkcd.com/' + data['favouritesID'][i] + '/')
        }
    });
}

function removeFavourites(data) {
    console.log(data);
    var index = parseInt(data['currentTarget']['attributes'][0]['nodeValue'].replace('deleteButton', ''));

    document.getElementById('favourites').removeChild(document.getElementById('favouriteLink' + index));
    document.getElementById('favourites').removeChild(document.getElementById('deleteButton' + index));
    document.getElementById('favourites').removeChild(document.getElementById('favouriteBreak' + index));

    StorageAreaLocal.get(null, function (data) {
        var favouritesIDList = [];
        favouritesIDList = favouritesIDList.concat(data['favouritesID']);
        favouritesIDList.splice(index, 1);
        StorageAreaLocal.set({'favouritesID': favouritesIDList});

        var favouritesNameList = [];
        favouritesNameList = favouritesNameList.concat(data['favouritesName']);
        favouritesNameList.splice(index, 1);
        StorageAreaLocal.set({'favouritesName': favouritesNameList});
    });
}

function fixRandomLink(data) {
    var historyList = data['history'];

    const latestId = (function () {
        const refId = 1411;
        const refTime = new Date(2014, 7, 22).getTime();

        const daysSinceRef = (Date.now() - refTime) / (1000 * 60 * 60 * 24) | 0;

        return refId + 3 / 7 * daysSinceRef | 0;
    })();

    var isNew = true;

    while (isNew) {
        var random = 1 + Math.random() * (latestId - 1) | 0;
        if (!has(historyList, random) && !(random == 404)) {
            document.getElementById('random').setAttribute('href', 'http://xkcd.com/' + random + '/');
            isNew = false;
        }
    }
}

function addFavouriteLinks(data) {
    for (var i = 0; i < data['favouritesID'].length; i++) {
        var para = document.createElement("div");
        document.getElementById('favourites').appendChild(para);

        document.getElementById('favourites').lastElementChild.outerHTML = '<button id="deleteButton' + i + '" class="button deleteButton" title="Remove comic \'' + data['favouritesID'][i] + ': ' + data['favouritesName'][i] + '\' from your favourites">&#9003;</button><a id="favouriteLink' + i + '" title="' + data['favouritesID'][i] + ': ' + data['favouritesName'][i] + '" href="http://xkcd.com/' + data['favouritesID'][i] + '/" target="_blank" class="favouritesLinks">' + data['favouritesID'][i] + ': ' + data['favouritesName'][i] + '</a><br id="favouriteBreak' + i + '">';
    }
}

/*function reloadPage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var activeTabUrl = activeTab.url;
        if (activeTabUrl.includes('xkcd.com')) {
            console.log('reload3');
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(activeTab.id, {code: code});
        }
    });
}/**/

document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');

    function search() {
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
    }


    $("#clearHistory").click(clearHistory);
    $("#openAllFavourites").click(openAllFavourites);
    $("#clearAllFavourites").click(clearAllFavourites);

    $("#SearchButton").click(search);
    $("#SearchField").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#SearchButton").click();
            return false;
        }
    });
    $("#reloadButton").click(loadList);

    retrieve('permanentLinkToggle');
    retrieve('imageLinkToggle');
    retrieve('explainLinkToggle');
    retrieve('Link3DToggle');
    retrieve('titleTextMover');
    retrieve('fixRandom');
    retrieve('favouritesButtonToggle');
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

    StorageAreaLocal.get(null, function (data) {
        fixRandomLink(data);
        addFavouriteLinks(data);
    });

    StorageAreaLocal.get(null, function (data) {
        for (var i = 0; i < data['favouritesID'].length; i++) {
            $('#deleteButton' + i).click(removeFavourites);
        }
    });
});
