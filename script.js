var badIDs = [1663, 1608, 1110, 506, 1525, 1193, 1506];

const StorageAreaSync = chrome.storage.sync;
const StorageAreaLocal = chrome.storage.local;

function has(obj, value) {
    for(var id in obj) {
        if(obj[id] == value) {
            return true;
        }
    }
    return false;
}

/*function removeFavouriteContent(deleteID) {
    var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
    id = id.replace(/^([\s\S]*)(com\/)/g, '');
    id = id.replace(/(\/)([\s\S]*)$/g, '');
    id = parseInt(id) + 1;
    console.log(id);
    console.log(deleteID);
    
    if (id == deleteID) {
        document.getElementById('addToFavourite').removeAttribute('disabled');
        document.getElementById('addToFavourite').firstChild.data = 'Add this comic to favourites'
    }
}/**/

var link;
link= document.createElement("link");
link.href = chrome.extension.getURL("fix.min.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

StorageAreaSync.get(null, function (syncData) {
    StorageAreaLocal.get(null, function (localData) {

        function randomFix(fixRandom, id) {
            if (!syncData['history']) {
                StorageAreaSync.set({'history': [id]});
            } else {
                var historyList = [];
                historyList = historyList.concat(syncData['history']);
                if (!has(historyList, id)) {
                    if (historyList.length == 1000) {
                        historyList.shift();
                        historyList.push(id);
                        StorageAreaSync.set({'history': historyList});
                    } else {
                        historyList.push(id);
                        StorageAreaSync.set({'history': historyList});
                    }
                }
            }

            if (fixRandom) {
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
                        document.querySelectorAll(".comicNav")[0].children[2].children[0].href = '/' + random + '/';
                        document.querySelectorAll(".comicNav")[1].children[2].children[0].href = '/' + random + '/';
                        isNew = false;
                    }
                }
            }
        }

        var permanentLinkToggle = syncData['permanentLinkToggle'];
        var imageLinkToggle = syncData['imageLinkToggle'];
        var explainLinkToggle = syncData['explainLinkToggle'];
        var Link3DToggle = syncData['Link3DToggle'];
        var titleTextMover = syncData['titleTextMover'];
        var keyboardNavigation = syncData['keyboardNavigation'];
        var arrowNavigation = syncData['arrowNavigation'];
        var fixRandom = syncData['fixRandom'];
        var favouritesButtonToggle = syncData['favouritesButtonToggle'];

        var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
        id = id.replace(/^([\s\S]*)(com\/)/g, '');
        id = id.replace(/(\/)([\s\S]*)$/g, '');
        id = parseInt(id) + 1;
        console.log(id);

        var name = document.title;
        name = name.replace(/^(xkcd: )/g, '');
        console.log(name);

        randomFix(fixRandom, id);

        function checkNav(e) {
            e = e || window.event;
            var comicNav = document.querySelectorAll(".comicNav");
            if (comicNav.length === 0) {
                return;
            }
            var win;
            if (id == 1608 || !arrowNavigation) {
                if (e.keyCode == '80') {
                    //prev
                    self.location = comicNav[0].children[1].children[0].href
                } else if (e.keyCode == '78') {
                    //next
                    self.location = comicNav[0].children[3].children[0].href;
                } else if (e.keyCode == '32' || e.keyCode == '82') {
                    //rand
                    e.preventDefault();
                    self.location = comicNav[0].children[2].children[0].href;
                } else if (e.keyCode == '69') {
                    //explain
                    win = window.open('http://www.explainxkcd.com/wiki/index.php/' + id, '_blank');
                    win.focus();
                } else if (e.keyCode == '70') {
                    if (localData['favouritesID']) {
                        var favouritesIDList = [];
                        favouritesIDList = favouritesIDList.concat(localData['favouritesID']);
                        if (!has(favouritesIDList, id)) {
                            favouritesIDList.push(id);
                            StorageAreaLocal.set({'favouritesID': favouritesIDList});
                        }
                    } else {
                        StorageAreaLocal.set({'favouritesID': [id]});
                    }

                    if (localData['favouritesName']) {
                        var favouritesNameList = [];
                        favouritesNameList = favouritesNameList.concat(localData['favouritesName']);
                        if (!has(favouritesNameList, name)) {
                            favouritesNameList.push(name);
                            StorageAreaLocal.set({'favouritesName': favouritesNameList});
                        }
                    } else {
                        StorageAreaLocal.set({'favouritesName': [name]});
                    }
                    document.getElementById('addToFavourite').setAttribute('disabled','');
                    document.getElementById('addToFavourite').firstChild.data = 'Added'
                }
            } else {
                if (e.keyCode == '37' || e.keyCode == '78') {
                    //next
                    self.location = comicNav[0].children[1].children[0].href
                } else if (e.keyCode == '39' || e.keyCode == '80') {
                    //prev
                    self.location = comicNav[0].children[3].children[0].href;
                } else if (e.keyCode == '38' || e.keyCode == '32' || e.keyCode == '82') {
                    e.preventDefault();
                    //rand
                    self.location = comicNav[0].children[2].children[0].href;
                } else if (e.keyCode == '69') {
                    //explain
                    win = window.open('http://www.explainxkcd.com/wiki/index.php/' + id, '_blank');
                    win.focus();
                } else if (e.keyCode == '70') {
                    if (localData['favouritesID']) {
                        var favouritesIDList = [];
                        favouritesIDList = favouritesIDList.concat(localData['favouritesID']);
                        if (!has(favouritesIDList, id)) {
                            favouritesIDList.push(id);
                            StorageAreaLocal.set({'favouritesID': favouritesIDList});
                        }
                    } else {
                        StorageAreaLocal.set({'favouritesID': [id]});
                    }

                    if (localData['favouritesName']) {
                        var favouritesNameList = [];
                        favouritesNameList = favouritesNameList.concat(localData['favouritesName']);
                        if (!has(favouritesNameList, name)) {
                            favouritesNameList.push(name);
                            StorageAreaLocal.set({'favouritesName': favouritesNameList});
                        }
                    } else {
                        StorageAreaLocal.set({'favouritesName': [name]});
                    }
                    document.getElementById('addToFavourite').setAttribute('disabled','');
                    document.getElementById('addToFavourite').firstChild.data = 'Added'
                }
            }
        }

        if (keyboardNavigation) {
            document.onkeydown = checkNav;
        }

        if (titleTextMover) {
            document.addEventListener('load', function () {
                var findComic = function (div) {
                    var children = div.children;
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (child.tagName === "IMG") return child;
                        else if (child.children.length > 0) return findComic(child);
                    }
                    return null;
                };

                var comic = document.getElementById("comic");
                if (comic === null) {
                    return;
                }

                if (!(badIDs.indexOf(id) >= 0)) {
                    if (window.titleText === undefined) {
                        window.titleText = true;
                        var image = findComic(comic);
                        var paragraph = document.createElement("p");
                        paragraph.innerHTML = 'Title text: ' + image.title;
                        paragraph.id = "titleText";
                        var padding = "25px";
                        paragraph.style.paddingLeft = padding;
                        paragraph.style.paddingRight = padding;
                        comic.appendChild(paragraph);
                    }
                }
            }, true);
        }

        var theDiv = document.getElementById("middleContainer");
        var html = theDiv.outerHTML;

        var imageURL = html;
        imageURL = imageURL.replace(/^([\s\S]*)(hotlinking\/embedding\): )/g, '');
        imageURL = imageURL.replace(/(<div id="transcript")([\s\S]*)$/g, '');
        //console.log(imageURL);

        var permanentLink = 'Permanent link to this comic: http://xkcd.com/' + id + '/';
        if (permanentLinkToggle) {
            permanentLink = 'Permanent link to this comic: <a title="permanent link to this comic" href="http://xkcd.com/' + id + '/" target="_blank">http://xkcd.com/' + id + '/</a>';
        }

        var imageLink = '<br>Image URL (for hotlinking/embedding): ' + imageURL;
        if (imageLinkToggle) {
            imageLink = '<br>Image URL (for hotlinking/embedding): <a title="link to this comic\'s image" href="' + imageURL + '" target="_blank">' + imageURL + '</a>';
        }

        var explainLink = '';
        if (explainLinkToggle) {
            explainLink = '<br>This comic\'s explain xkcd page: <a title="link to explain xkcd" href="http://www.explainxkcd.com/wiki/index.php/' + id + '" target="_blank">http://www.explainxkcd.com/wiki/index.php/' + id + '</a>';
        }

        var Link3D = '';
        if (id <= 880 && Link3DToggle) {
            Link3D = '<br>3D version of this comic: <a title="link to 3D comic" href="http://xk3d.xkcd.com/' + id + '" target="_blank">http://xk3d.xkcd.com/' + id + '</a>';
        }

        var favouritesButton = '';
        if (favouritesButtonToggle) {
            if (has(localData['favouritesID'], id)) {
                favouritesButton = '<button class="deleteButton" id="removeFromFavourite"/>Remove this comic from favourites</button><br>';
            } else {
                favouritesButton = '<button class="button" id="addToFavourite"/>Add this comic to favourites</button><br>';
            }
        }

        var el = document.getElementById("middleContainer"), child = el.firstChild, nextChild;

        while (child) {
            nextChild = child.nextSibling;
            if (child.nodeType == 3) {
                el.removeChild(child);
            }
            child = nextChild;
        }

        theDiv.removeChild(theDiv.getElementsByTagName('br').item(0));
        theDiv.removeChild(theDiv.getElementsByTagName('br').item(0));

        html = favouritesButton + permanentLink + imageLink + explainLink + Link3D;
        var para = document.createElement("div");
        theDiv.appendChild(para);

        document.getElementById('middleContainer').lastElementChild.outerHTML = html;

        document.getElementById('addToFavourite').addEventListener('click', function () {
            if (localData['favouritesID']) {
                var favouritesIDList = [];
                favouritesIDList = favouritesIDList.concat(localData['favouritesID']);
                if (!has(favouritesIDList, id)) {
                    favouritesIDList.push(id);
                    StorageAreaLocal.set({'favouritesID': favouritesIDList});
                }
            } else {
                StorageAreaLocal.set({'favouritesID': [id]});
            }

            if (localData['favouritesName']) {
                var favouritesNameList = [];
                favouritesNameList = favouritesNameList.concat(localData['favouritesName']);
                if (!has(favouritesNameList, name)) {
                    favouritesNameList.push(name);
                    StorageAreaLocal.set({'favouritesName': favouritesNameList});
                }
            } else {
                StorageAreaLocal.set({'favouritesName': [name]});
            }
            document.getElementById('addToFavourite').setAttribute('disabled','');
            document.getElementById('addToFavourite').firstChild.data = 'Added'
        });
    });
});