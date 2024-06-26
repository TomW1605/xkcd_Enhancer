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
//const StorageAreaLocal = chrome.storage.local;

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

function removeLast(list) {
    var last = list[list.length - 1];
    last.parentNode.removeChild(last);
}

var link;
link = document.createElement("link");
link.href = chrome.runtime.getURL("fix.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

function toggleFavourite()
{
    var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
    id = id.replace(/^([\s\S]*)(com\/)/g, '');
    id = id.replace(/(\/)([\s\S]*)$/g, '');
    id = parseInt(id) + 1;

    StorageAreaSync.get(null, function (syncData)
    {
        console.log('toggle');
        var toggle = document.getElementById('toggleFavourite');
        if (syncData['favourites'])
        {
            var favouritesList = [];
            favouritesList = favouritesList.concat(syncData['favourites']);

            if (has(favouritesList, id))
            {
                console.log('remove');
                favouritesList.remove(id);
                console.log(favouritesList);
                StorageAreaSync.set({'favourites': favouritesList});
                toggle.setAttribute('class', 'button');
                toggle.firstChild.data = 'Add this comic to favourites';
            }
            else if (favouritesList.length == 1637)
            {
                console.log('too many');
                toggle.setAttribute('class', 'disabledButton');
                toggle.firstChild.data = 'Too many favourites';
                alert("You have added too many favourites.The max is 1637. " +
                    "This is due to the size limit on chrome sync storage. " +
                    "If you want to add more please remove some old ones first. " +
                    "If this is a problem please contact the developer at xkcd.Enhancer@gmail.com");
            }
            else
            {
                console.log('add');
                toggle.setAttribute('class', 'deleteButton');
                toggle.firstChild.data = 'Remove this comic from favourites';
                favouritesList.push(id);
                console.log(favouritesList);
                StorageAreaSync.set({'favourites': favouritesList});
            }
        }
        else
        {
            StorageAreaSync.set({'favourites': [id]});
            toggle.setAttribute('class', 'deleteButton');
            toggle.firstChild.data = 'Remove this comic from favourites';
        }
    });
}

async function getBadIDs()
{
    const return_val = await chrome.runtime.sendMessage({ greeting: 'badIDs' });
    return return_val.badIDs;
}

StorageAreaSync.get(null, function (syncData)
{
    getBadIDs().then(badIDs => {

        console.log(syncData);
        console.log(badIDs);

        if (!syncData['favourites'])
        {
            StorageAreaSync.set({'favourites': []});
        }

        function randomFix(fixRandom, id)
        {
            if (!syncData['history'])
            {
                StorageAreaSync.set({'history': [id]});
            }
            else
            {
                var historyList = [];
                historyList = historyList.concat(syncData['history']);
                if (!has(historyList, id))
                {
                    if (historyList.length == 1500)
                    {
                        historyList.shift();
                        historyList.push(id);
                        StorageAreaSync.set({'history': historyList});
                    }
                    else
                    {
                        historyList.push(id);
                        StorageAreaSync.set({'history': historyList});
                    }
                }
            }

            if (fixRandom)
            {
                var list = historyList.concat(syncData['favourites']);
                $.getJSON("/info.0.json", function (latest)
                {
                    const latestId = latest["num"];
                    var isNew = true;

                    while (isNew)
                    {
                        var random = getRndInteger(1,latestId);
                        if (!has(list, random) && !(random == 404))
                        {
                            document.querySelectorAll(".comicNav")[0].children[2].children[0].href = '/' + random + '/';
                            document.querySelectorAll(".comicNav")[1].children[2].children[0].href = '/' + random + '/';
                            isNew = false;
                        }
                    }
                });
            }
        }

        var permanentLinkToggle = syncData['permanentLinkToggle'];
        console.log("permanentLinkToggle: " + permanentLinkToggle);

        var imageLinkToggle = syncData['imageLinkToggle'];
        console.log("imageLinkToggle: " + imageLinkToggle);

        var explainLinkToggle = syncData['explainLinkToggle'];
        console.log("explainLinkToggle: " + explainLinkToggle);

        var Link3DToggle = syncData['Link3DToggle'];
        console.log("Link3DToggle: " + Link3DToggle);

        var titleTextMover = syncData['titleTextMover'];
        console.log("titleTextMover: " + titleTextMover);

        var keyboardNavigation = syncData['keyboardNavigation'];
        console.log("keyboardNavigation: " + keyboardNavigation);

        var arrowNavigation = syncData['arrowNavigation'];
        console.log("arrowNavigation: " + arrowNavigation);

        var fixRandom = syncData['fixRandom'];
        console.log("fixRandom: " + fixRandom);

        var favouritesButtonToggle = syncData['favouritesButtonToggle'];
        console.log("favouritesButtonToggle: " + favouritesButtonToggle);


        var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
        id = id.replace(/^([\s\S]*)(com\/)/g, '');
        id = id.replace(/(\/)([\s\S]*)$/g, '');
        id = parseInt(id) + 1;
        console.log(id);

        var name = document.title;
        name = name.replace(/^(xkcd: )/g, '');
        console.log(name);

        randomFix(fixRandom, id);

        function checkNav(e)
        {
            e = e || window.event;
            var comicNav = document.querySelectorAll(".comicNav");
            if (comicNav.length === 0)
            {
                return;
            }
            var win;
            if (keyboardNavigation&& !(badIDs['noKeyboardNav'].indexOf(id) >= 0))
            {
                if (e.keyCode == '80')
                {
                    //prev
                    self.location = comicNav[0].children[1].children[0].href
                }
                else if (e.keyCode == '82' || e.keyCode == '32')
                {
                    //rand
                    e.preventDefault();
                    self.location = comicNav[0].children[2].children[0].href;
                }
                else if (e.keyCode == '78')
                {
                    //next
                    self.location = comicNav[0].children[3].children[0].href;
                }
                else if (e.keyCode == '69')
                {
                    //explain
                    win = window.open('http://www.explainxkcd.com/wiki/index.php/' + id, '_blank');
                    win.focus();
                }
                else if (e.keyCode == '70')
                {
                    //favourite
                    toggleFavourite();
                }
            }

            if (arrowNavigation && !(badIDs['noArrowNav'].indexOf(id) >= 0))
            {

                if (e.keyCode == '37')
                {
                    //prev
                    self.location = comicNav[0].children[1].children[0].href
                }
                else if (e.keyCode == '38')
                {
                    e.preventDefault();
                    //rand
                    self.location = comicNav[0].children[2].children[0].href;
                }
                else if (e.keyCode == '39')
                {
                    //next
                    self.location = comicNav[0].children[3].children[0].href;
                }
            }
        }

        document.onkeydown = checkNav;

        if (titleTextMover)
        {
            document.addEventListener('load', function ()
            {
                var findComic = function (div)
                {
                    var children = div.children;
                    for (var i = 0; i < children.length; i++)
                    {
                        var child = children[i];
                        if (child.tagName === "IMG")
                        {
                            return child;
                        }
                        else if (child.children.length > 0)
                        {
                            return findComic(child);
                        }
                    }
                    return null;
                };

                var comic = document.getElementById("comic");
                if (comic === null)
                {
                    return;
                }

                if (!(badIDs['badHTML'].indexOf(id) >= 0))
                {
                    if (window.titleText === undefined)
                    {
                        window.titleText = true;
                        var image = findComic(comic);
                        var paragraph = document.createElement("p");
                        paragraph.innerHTML = image.title;
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
        imageURL = imageURL.replace(/^<a .*">/g, '');
        imageURL = imageURL.replace(/<\/a>\n\n$/g, '');
        console.log(imageURL);

        var permanentLink = 'Permanent link to this comic: http://xkcd.com/' + id + '/';
        if (permanentLinkToggle)
        {
            permanentLink = 'Permanent link to this comic: <a title="permanent link to this comic" href="http://xkcd.com/' + id + '/" target="_blank">http://xkcd.com/' + id + '/</a>';
        }

        var imageLink = '<br>Image URL (for hotlinking/embedding): ' + imageURL;
        if (imageLinkToggle)
        {
            imageLink = '<br>Image URL (for hotlinking/embedding): <a title="link to this comic\'s image" href="' + imageURL + '" target="_blank">' + imageURL + '</a>';
        }

        var explainLink = '';
        if (explainLinkToggle)
        {
            explainLink = '<br>This comic\'s explain xkcd page: <a title="link to explain xkcd" href="http://www.explainxkcd.com/wiki/index.php/' + id + '" target="_blank">http://www.explainxkcd.com/wiki/index.php/' + id + '</a>';
        }

        var Link3D = '';
        if (id <= 880 && Link3DToggle)
        {
            Link3D = '<br>3D version of this comic: <a title="link to 3D comic" href="http://xk3d.xkcd.com/' + id + '" target="_blank">http://xk3d.xkcd.com/' + id + '</a>';
        }

        var favouritesButton = '';
        if (favouritesButtonToggle)
        {
            if (has(syncData['favourites'], id))
            {
                favouritesButton = '<button class="deleteButton" id="toggleFavourite"/>Remove this comic from favourites</button><br><br>';
            }
            else if (syncData['favourites'].length == 1637)
            {
                favouritesButton = '<button class="disabledButton" id="toggleFavourite"/>Too many favourites</button><br><br>';
            }
            else
            {
                favouritesButton = '<button class="button" id="toggleFavourite"/>Add this comic to favourites</button><br><br>';
            }
        }

        var el = document.getElementById("middleContainer"), child = el.firstChild, nextChild;

        while (child)
        {
            nextChild = child.nextSibling;
            if (child.nodeType == 3)
            {
                el.removeChild(child);
            }
            child = nextChild;
        }

        removeLast(theDiv.getElementsByTagName('a'))
        removeLast(theDiv.getElementsByTagName('a'))
        removeLast(theDiv.getElementsByTagName('br'))
        removeLast(theDiv.getElementsByTagName('br'))


        html = favouritesButton + permanentLink + imageLink + explainLink + Link3D;
        //console.log(html);
        var para = document.createElement("div");
        theDiv.appendChild(para);

        document.getElementById('middleContainer').lastElementChild.outerHTML = html;

        if (favouritesButtonToggle) {
            document.getElementById('toggleFavourite').addEventListener('click', toggleFavourite);
        }

    });
});
