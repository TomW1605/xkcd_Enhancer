var badIDs = [1663, 1608, 1110, 506, 1525, 1193];

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

var link;
link= document.createElement("link");
link.href = chrome.extension.getURL("fix.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

StorageAreaSync.get(['permanentLinkToggle', 'imageLinkToggle', 'explainLinkToggle', 'Link3DToggle', 'titleTextMover', 'keyboardNavigation', 'arrowNavigation', 'fixRandom', 'favouritesButtonToggle'], function (data) {
    var permanentLinkToggle = data['permanentLinkToggle'];
    var imageLinkToggle = data['imageLinkToggle'];
    var explainLinkToggle = data['explainLinkToggle'];
    var Link3DToggle = data['Link3DToggle'];
    var titleTextMover = data['titleTextMover'];
    var keyboardNavigation = data['keyboardNavigation'];
    var arrowNavigation = data['arrowNavigation'];
    var fixRandom = data['fixRandom'];
    var favouritesButtonToggle = data['favouritesButtonToggle'];

    var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
    id = id.replace(/^([\s\S]*)(com\/)/g, '');
    id = id.replace(/(\/)([\s\S]*)$/g, '');
    id = parseInt(id) + 1;
    console.log(id);

    var name = document.title;
    name = name.replace(/^(xkcd: )/g, '');
    console.log(name);

    StorageAreaLocal.get('history', function (data) {
        StorageAreaLocal.get(null, function (e) {

            if(!e['history']){
                StorageAreaLocal.set({'history': [id]});
            } else {
                var historyList = [];
                historyList = historyList.concat(data['history']);
                if(!has(historyList, id)) {
                    if(historyList.length<1000) {
                        historyList.push(id);
                        StorageAreaLocal.set({'history': historyList});
                    } else {
                        historyList.shift();
                        historyList.push(id);
                        StorageAreaLocal.set({'history': historyList});
                    }
                }
            }

            if(fixRandom) {
                const latestId = (function () {
                    const refId = 1411;
                    const refTime = new Date(2014, 7, 22).getTime();

                    const daysSinceRef = (Date.now() - refTime) / (1000 * 60 * 60 * 24) | 0;

                    return refId + 3 / 7 * daysSinceRef | 0;
                })();

                var isNew = true;
                while (isNew) {
                    var random = 1 + Math.random() * (latestId - 1) | 0;
                    if (!has(historyList, random)&&!(random==404)) {
                        document.querySelectorAll(".comicNav")[0].children[2].children[0].href = '/' + random + '/';
                        document.querySelectorAll(".comicNav")[1].children[2].children[0].href = '/' + random + '/';
                        isNew = false;
                    }
                }
            }
        });
    });

    function checkNav(e) {
        e = e || window.event;
        var comicNav = document.querySelectorAll(".comicNav");
        if (comicNav.length === 0) {
            return;
        }
        var win;
        if(id==1608||!arrowNavigation) {
            if (e.keyCode == '80') {
                //prev
                self.location = comicNav[0].children[1].children[0].href
            } else if (e.keyCode == '78') {
                //next
                self.location = comicNav[0].children[3].children[0].href;
            } else if (e.keyCode == '32' || e.keyCode == '82') {
                //rand
                self.location = comicNav[0].children[2].children[0].href;
            } else if (e.keyCode == '69') {
                //explain
                win = window.open('http://www.explainxkcd.com/wiki/index.php/' + id, '_blank');
                win.focus();
            } else if (e.keyCode == '70') {
                StorageAreaLocal.get('favouritesID', function (data) {
                    StorageAreaLocal.get(null, function (e) {

                        if (!e['favouritesID']) {
                            StorageAreaLocal.set({'favouritesID': [id]});
                        } else {
                            var favouritesIDList = [];
                            favouritesIDList = favouritesIDList.concat(data['favouritesID']);
                            if (!has(favouritesIDList, id)) {
                                favouritesIDList.push(id);
                                StorageAreaLocal.set({'favouritesID': favouritesIDList});
                            }
                        }
                    });
                });

                StorageAreaLocal.get('favouritesName', function (data) {
                    StorageAreaLocal.get(null, function (e) {

                        if (!e['favouritesName']) {
                            StorageAreaLocal.set({'favouritesName': [name]});
                        } else {
                            var favouritesNameList = [];
                            favouritesNameList = favouritesNameList.concat(data['favouritesName']);
                            if (!has(favouritesNameList, name)) {
                                favouritesNameList.push(name);
                                StorageAreaLocal.set({'favouritesName': favouritesNameList});
                            }
                        }
                    });
                });
            }
        } else {
            if (e.keyCode == '37' || e.keyCode == '78') {
                //next
                self.location = comicNav[0].children[1].children[0].href
            } else if (e.keyCode == '39' || e.keyCode == '80') {
                //prev
                self.location = comicNav[0].children[3].children[0].href;
            } else if (e.keyCode == '38' || e.keyCode == '32' || e.keyCode == '82') {
                //rand
                self.location = comicNav[0].children[2].children[0].href;
            } else if (e.keyCode == '69') {
                //explain
                win = window.open('http://www.explainxkcd.com/wiki/index.php/' + id, '_blank');
                win.focus();
            } else if (e.keyCode == '70') {
                StorageAreaLocal.get('favouritesID', function (data) {
                    StorageAreaLocal.get(null, function (e) {

                        if (!e['favouritesID']) {
                            StorageAreaLocal.set({'favouritesID': [id]});
                        } else {
                            var favouritesIDList = [];
                            favouritesIDList = favouritesIDList.concat(data['favouritesID']);
                            if (!has(favouritesIDList, id)) {
                                favouritesIDList.push(id);
                                StorageAreaLocal.set({'favouritesID': favouritesIDList});
                            }
                        }
                    });
                });

                StorageAreaLocal.get('favouritesName', function (data) {
                    StorageAreaLocal.get(null, function (e) {

                        if (!e['favouritesName']) {
                            StorageAreaLocal.set({'favouritesName': [name]});
                        } else {
                            var favouritesNameList = [];
                            favouritesNameList = favouritesNameList.concat(data['favouritesName']);
                            if (!has(favouritesNameList, name)) {
                                favouritesNameList.push(name);
                                StorageAreaLocal.set({'favouritesName': favouritesNameList});
                            }
                        }
                    });
                });
            }
        }
    }

    if (keyboardNavigation) {
        document.onkeydown = checkNav;
    }

    if (titleTextMover) {
        document.addEventListener('load', function () {
            // not every comic img is in the comic div, sometimes you have links or other stuff
            // recurse down the DOM starting from comic until you hit an <img>
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
    console.log(imageURL);

    if (false) {
        document.getElementById('transcript').setAttribute('style', 'display: block;margin-bottom: 10px;');
    }

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
        favouritesButton = '<button class="button" id="addToFavourite"/>Add this comic to favourites</button><br>'
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

    document.getElementById('addToFavourite').addEventListener('click', function addToFavourite() {
        StorageAreaLocal.get('favouritesID', function (data) {
            StorageAreaLocal.get(null, function (e) {

                if (!e['favouritesID']) {
                    StorageAreaLocal.set({'favouritesID': [id]});
                } else {
                    var favouritesIDList = [];
                    favouritesIDList = favouritesIDList.concat(data['favouritesID']);
                    if (!has(favouritesIDList, id)) {
                        favouritesIDList.push(id);
                        StorageAreaLocal.set({'favouritesID': favouritesIDList});
                    }
                }
            });
        });

        StorageAreaLocal.get('favouritesName', function (data) {
            StorageAreaLocal.get(null, function (e) {

                if (!e['favouritesName']) {
                    StorageAreaLocal.set({'favouritesName': [name]});
                } else {
                    var favouritesNameList = [];
                    favouritesNameList = favouritesNameList.concat(data['favouritesName']);
                    if (!has(favouritesNameList, name)) {
                        favouritesNameList.push(name);
                        StorageAreaLocal.set({'favouritesName': favouritesNameList});
                    }
                }
            });
        });
    });
});