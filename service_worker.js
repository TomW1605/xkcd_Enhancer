const updateJson = async () => {
    const response = await fetch('https://raw.githubusercontent.com/TomW1605/xkcd_Enhancer/master/badIDs.json');
    const bad_ids = await response.json();
    console.log(bad_ids);
    return chrome.storage.local.set({
        'badIDs': {
            'badHTML': bad_ids['badHTML'],
            'noKeyboardNav': bad_ids['noKeyboardNav'],
            'noArrowNav': bad_ids['noArrowNav']
        }
    });
};

const ALARM_NAME = 'updateJson';

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts.
async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 720
        });
        updateJson();
    }
}

createAlarm();

// Update tip once a day
chrome.alarms.onAlarm.addListener(updateJson);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.greeting === 'badIDs') {
        chrome.storage.local.get('badIDs').then(sendResponse);
        return true;
    }
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        updateJson();
        chrome.storage.sync.get(null, function (syncData)
        {
            const options = [
                'permanentLinkToggle',
                'imageLinkToggle',
                'explainLinkToggle',
                'Link3DToggle',
                'titleTextMover',
                'keyboardNavigation',
                'arrowNavigation',
                'fixRandom',
                'favouritesButtonToggle'
            ];

            for (const option in options) {
                if (syncData[option] === undefined) {
                    chrome.storage.sync.set({option: false});
                }
            }
        });
    }
});

//this migration is no longer needed
/*const StorageAreaSync = chrome.storage.sync;
const StorageAreaLocal = chrome.storage.local;

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

StorageAreaSync.get(null, function (syncData)
{
    StorageAreaLocal.get(null, function (localData)
    {
        if (localData['favouritesID'])
        {
            var oldFavouritesList = [];
            oldFavouritesList = oldFavouritesList.concat(localData['favouritesID']);
            var newFavouritesList = [];
            if (syncData['favourites'])
            {
                newFavouritesList = newFavouritesList.concat(syncData['favourites']);
            }

            console.log(oldFavouritesList);
            console.log(newFavouritesList);

            for (var i = 0; i < oldFavouritesList.length; i++)
            {
                if (!has(newFavouritesList, oldFavouritesList[i]))
                {
                    newFavouritesList.push(oldFavouritesList[i]);
                }
            }
            if (newFavouritesList.length >= 1637)
            {
                alert("You have added too many favourites. The max is 1637. " +
                    "This is due to the size limit on chrome sync storage. " +
                    "If you want to add more please remove some old ones first. " +
                    "If this is a problem please contact the developer at xkcd.Enhancer@gmail.com");
            }
            else
            {
                StorageAreaSync.set({'favourites': newFavouritesList});
                StorageAreaLocal.clear();
            }
        }
    });
});*/

/*function loadList()
{
    var comicList;
    var comicListText;
    var newID;
    var latestID;
    var data;
    var oldID;
    try
    {
        comicList = [];
        comicListText = JSON.parse($.ajax({
            url: 'http://xkcdenhancer.hopto.org/comicList.json',
            async: false,
            timeout: 3000
        }).responseText);
        console.log(comicListText);
        comicList = comicList.concat(comicListText['comicList']);
        newID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false});
        newID = newID.responseJSON;
        latestID = newID['num'] + 1;
        for (oldID = comicListText['comicList'].length + 1; oldID < latestID; oldID++)
        {
            console.log(oldID);
            data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
            data = data.responseJSON;
            if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt']))
            {
                comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
            }
        }
        StorageAreaLocal.set({'comicList': comicList});
        console.log('list saved');
    }
    catch (e)
    {
        console.log("couldn't access web server");
        try
        {
            comicList = [];
            comicListText = JSON.parse($.ajax({
                url: 'http://parallaxgame.com/comicList.json',
                async: false,
                timeout: 3000
            }).responseText);
            console.log(comicListText);
            comicList = comicList.concat(comicListText['comicList']);
            newID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false});
            newID = newID.responseJSON;
            latestID = newID['num'] + 1;
            for (oldID = comicListText['comicList'].length + 1; oldID < latestID; oldID++)
            {
                console.log(oldID);
                data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
                data = data.responseJSON;
                if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt']))
                {
                    comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
                }
            }
            StorageAreaLocal.set({'comicList': comicList});
            console.log('list saved');
        }
        catch (e)
        {
            console.log("couldn't access dan\'s web server");
            comicList = [];
            comicListText = JSON.parse($.ajax({
                url: chrome.extension.getURL("comicList.json"),
                async: false
            }).responseText);
            console.log(comicListText);

            newID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false});
            newID = newID.responseJSON;
            latestID = newID['num'] + 1;

            StorageAreaLocal.get(null, function (e)
            {
                var data;
                if (e['comicList'])
                {
                    console.log('it is there');
                    comicList = comicList.concat(e['comicList']);
                    for (var oldID = e['comicList'].length + 1; oldID < latestID; oldID++)
                    {
                        data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
                        data = data.responseJSON;
                        if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt']))
                        {
                            comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
                        }
                    }
                }
                else
                {
                    console.log('it is not there');
                    comicList = comicList.concat(comicListText['comicList']);
                    for (var i = 1681; i < latestID; i++)
                    {
                        data = $.ajax({url: 'http://xkcd.com/' + i + '/info.0.json', async: false});
                        data = data.responseJSON;
                        if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt']))
                        {
                            comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
                        }
                    }
                }
                StorageAreaLocal.set({'comicList': comicList});
                console.log('list saved');
            });
        }
    }
}

function unread()
{
    function onClose1(seenID)
    {
        seen = seenID;
        test = true;
    }

    function onClicked1()
    {
        chrome.notifications.clear(latestID.toString());
        chrome.windows.getCurrent(function (currentWindow)
        {
            if (currentWindow != null)
            {
                return chrome.tabs.create({
                    'url': "http://xkcd.com/"
                });
            }
            else
            {
                return chrome.windows.create({
                    'url': "http://xkcd.com/",
                    'focused': true
                });
            }
        });
        test = true;
    }

    chrome.browserAction.setBadgeBackgroundColor({color: "#6E7B91"});
    var latestID;
    var history;
    StorageAreaSync.get(null, function (syncData)
    {
        latestID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false}).responseJSON['num'];
        history = syncData['history'];
        if (has(history, latestID) || !syncData['newBadge'])
        {
            chrome.browserAction.setBadgeText({text: ""});
        }
        else if (syncData['newBadge'])
        {
            chrome.browserAction.setBadgeText({text: 'NEW'});
        }

        if (has(history, latestID) || !syncData['newBadge'])
        {
            chrome.notifications.clear(latestID.toString())
        }
        else if (syncData['newBadge'] && seen != latestID)
        {
            var options = {
                type: "basic",
                iconUrl: "../icon.png",
                title: "New Comic",
                message: "A new xkcd comic has been released"
            };
            chrome.notifications.create(latestID.toString(), options);
            if (test)
            {
                chrome.notifications.onClosed.addListener(onClose1);
                chrome.notifications.onClicked.addListener(onClicked1);
                test = false
            }
        }
    });
}

var test = true;
var seen;

loadList();
unread();

window.setInterval(function ()
{
    loadList();
}, 21600000);

window.setInterval(function ()
{
    unread();
}, 100);
*/
