var StorageArea = chrome.storage.local;

function add(text) {
    console.log(text);
}

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

StorageArea.get(null, function(data) {
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
        if (!has(historyList, random)) {
            document.getElementById('random').setAttribute('href', 'http://xkcd.com/' + random + '/');
            isNew = false;
        }
    }
});

StorageArea.get(null, function(data) {
    for (var i = 0; i < data['favouritesID'].length; i++) {
        var para = document.createElement("div");
        document.getElementById('favourites').appendChild(para);
        document.getElementById('favourites').lastElementChild.outerHTML = '<button id="deleteButton' + i + '" class="button deleteButton">&#9003;</button><a id="favouriteLink' + i + '" title="' + data['favouritesID'][i] + ': ' + data['favouritesName'][i] + '" href="http://xkcd.com/' + data['favouritesID'][i] + '/" target="_blank" class="favouritesLinks">' + data['favouritesID'][i] + ': ' + data['favouritesName'][i] + '</a><br id="favouriteBreak' + i + '">';
    }
});
/**/

function retrieve(name) {
    StorageArea.get(null, function (data) {
        console.info(data[name]);
        if (!data[name]) {
            document.getElementById(name).removeAttribute("checked");
            if (name == 'keyboardNavigation') {
                document.getElementById('arrowNavigation').disabled = true;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');
    retrieve('permanentLinkToggle');
    retrieve('imageLinkToggle');
    retrieve('explainLinkToggle');
    retrieve('Link3DToggle');
    retrieve('titleTextMover');
    retrieve('fixRandom');
    retrieve('keyboardNavigation');
    retrieve('arrowNavigation');
});

var permanentLinkToggle;

function permanentLinkCheckboxToggled() {
    var checkbox = document.getElementById('permanentLinkToggle').checked;
    if (!checkbox) {
        add('<br>permanentLinkToggle: off');
        document.getElementById('permanentLinkToggle').removeAttribute("checked");
        permanentLinkToggle = false;
    } else {
        add('<br>permanentLinkToggle: on');
        document.getElementById('permanentLinkToggle').setAttribute("checked", "");
        permanentLinkToggle = true;
    }
    StorageArea.set({'permanentLinkToggle': permanentLinkToggle});
}

var imageLinkToggle;

function imageLinkToggleCheckboxToggled() {
    var checkbox = document.getElementById('imageLinkToggle').checked;
    if (!checkbox) {
        add('<br>imageLinkToggle: off');
        document.getElementById('imageLinkToggle').removeAttribute("checked");
        imageLinkToggle = false;
    } else {
        add('<br>imageLinkToggle: on');
        document.getElementById('imageLinkToggle').setAttribute("checked", "");
        imageLinkToggle = true;
    }
    StorageArea.set({'imageLinkToggle': imageLinkToggle});
}

var explainLinkToggle;

function explainLinkToggleCheckboxToggled() {
    var checkbox = document.getElementById('explainLinkToggle').checked;
    if (!checkbox) {
        add('<br>explainLinkToggle: off');
        document.getElementById('explainLinkToggle').removeAttribute("checked");
        explainLinkToggle = false;
    } else {
        add('<br>explainLinkToggle: on');
        document.getElementById('explainLinkToggle').setAttribute("checked", "");
        explainLinkToggle = true;
    }
    StorageArea.set({'explainLinkToggle': explainLinkToggle});
}

var Link3DToggle;

function Link3DToggleCheckboxToggled() {
    var checkbox = document.getElementById('Link3DToggle').checked;
    if (!checkbox) {
        add('<br>Link3DToggle: off');
        document.getElementById('Link3DToggle').removeAttribute("checked");
        Link3DToggle = false;
    } else {
        add('<br>Link3DToggle: on');
        document.getElementById('Link3DToggle').setAttribute("checked", "");
        Link3DToggle = true;
    }
    StorageArea.set({'Link3DToggle': Link3DToggle});
}

var titleTextMover;

function titleTextMoverToggled() {
    var checkbox = document.getElementById('titleTextMover').checked;
    if (!checkbox) {
        add('<br>titleTextMover: off');
        document.getElementById('titleTextMover').removeAttribute("checked");
        titleTextMover = false;
    } else {
        add('<br>titleTextMover: on');
        document.getElementById('titleTextMover').setAttribute("checked", "");
        titleTextMover = true;
    }
    StorageArea.set({'titleTextMover': titleTextMover});
}

var fixRandom;

function fixRandomToggled() {
    var checkbox = document.getElementById('fixRandom').checked;
    if (!checkbox) {
        add('<br>fixRandom: off');
        document.getElementById('fixRandom').removeAttribute("checked");
        fixRandom = false;
    } else {
        add('<br>fixRandom: on');
        document.getElementById('fixRandom').setAttribute("checked", "");
        fixRandom = true;
    }
    StorageArea.set({'fixRandom': fixRandom});
}

var keyboardNavigation;

function keyboardNavigationToggled() {
    var checkbox = document.getElementById('keyboardNavigation').checked;
    if (!checkbox) {
        add('<br>keyboardNavigation: off');
        document.getElementById('keyboardNavigation').removeAttribute("checked");
        document.getElementById('arrowNavigation').disabled = true;
        keyboardNavigation = false;
    } else {
        add('<br>keyboardNavigation: on');
        document.getElementById('keyboardNavigation').setAttribute("checked", "");
        document.getElementById('arrowNavigation').disabled = false;
        keyboardNavigation = true;
    }
    StorageArea.set({'keyboardNavigation': keyboardNavigation});
}

var arrowNavigation;

function arrowNavigationToggled() {
    var checkbox = document.getElementById('arrowNavigation').checked;
    if (!checkbox) {
        add('<br>arrowNavigation: off');
        document.getElementById('arrowNavigation').removeAttribute("checked");
        arrowNavigation = false;
    } else {
        add('<br>arrowNavigation: on');
        document.getElementById('arrowNavigation').setAttribute("checked", "");
        arrowNavigation = true;
    }
    StorageArea.set({'arrowNavigation': arrowNavigation});
}

function clearHistory() {
    console.log('history cleared');
    StorageArea.set({'history': []});
}

function openAllFavourites() {
    StorageArea.get('favouritesID', function (data) {
        for (var i = 0; i < data['favouritesID'].length; i++) {
            OpenInNewTab('http://xkcd.com/' + data['favouritesID'][i] + '/')
        }
    });
}

function clearAllFavourites() {
    StorageArea.set({'favouritesID': []});
    StorageArea.set({'favouritesName': []});
    while (document.getElementById('favourites').hasChildNodes()) {
        document.getElementById('favourites').removeChild(document.getElementById('favourites').lastChild);
    }
}

document.addEventListener('click', function (e) {
    if (!e.target.classList.contains("checkbox")) {
        document.getElementById('permanentLinkToggle').addEventListener('change', permanentLinkCheckboxToggled);
        document.getElementById('imageLinkToggle').addEventListener('change', imageLinkToggleCheckboxToggled);
        document.getElementById('explainLinkToggle').addEventListener('change', explainLinkToggleCheckboxToggled);
        document.getElementById('Link3DToggle').addEventListener('change', Link3DToggleCheckboxToggled);
        document.getElementById('titleTextMover').addEventListener('change', titleTextMoverToggled);
        document.getElementById('fixRandom').addEventListener('change', fixRandomToggled);
        document.getElementById('keyboardNavigation').addEventListener('change', keyboardNavigationToggled);
        document.getElementById('arrowNavigation').addEventListener('change', arrowNavigationToggled);
    }
});

function removeFavourites(data) {
    var index = parseInt(data['currentTarget']['attributes'][0]['nodeValue'].replace('deleteButton',''));
    console.log(index);

    document.getElementById('favourites').removeChild(document.getElementById('favouriteLink' + index));
    document.getElementById('favourites').removeChild(document.getElementById(data['currentTarget']['attributes'][0]['nodeValue']));
    document.getElementById('favourites').removeChild(document.getElementById('favouriteBreak' + index));

    StorageArea.get(null, function (data) {
        var favouritesIDList = [];
        favouritesIDList = favouritesIDList.concat(data['favouritesID']);
        favouritesIDList.splice(index, 1);
        StorageArea.set({'favouritesID': favouritesIDList});

        var favouritesNameList = [];
        favouritesNameList = favouritesNameList.concat(data['favouritesName']);
        favouritesNameList.splice(index, 1);
        StorageArea.set({'favouritesName': favouritesNameList});
    });
}

window.onload = function () {
    $("#clearHistory").click(clearHistory);
    $("#openAllFavourites").click(openAllFavourites);
    $("#clearAllFavourites").click(clearAllFavourites);
    StorageArea.get(null, function (data) {
        for (var i = 0; i < data['favouritesID'].length; i++) {
            $('#deleteButton' + i).click(removeFavourites);
        }
    });
};

var favouritesName = ["Hoverboard", "Laser Products", "Hypotheticals", "Darkness", "Success", "Plastic Bags", "Interdisciplinary", "Keyboard Problems", "File Extensions"];