function has(obj, value) {
    for (var id in obj) {
        if (obj[id] == value) {
            return true;
        }
    }
    return false;
}

function loadList() {
    var comicList;
    var comicListText;
    var newID;
    var latestID;
    var data;
    var oldID;
    try {
        comicList = [];
        comicListText = JSON.parse($.ajax({url: 'http://xkcdenhancer.hopto.org/comicList.json', async: false, timeout: 3000}).responseText);
        console.log(comicListText);
        comicList = comicList.concat(comicListText['comicList']);
        newID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false});
        newID = newID.responseJSON;
        latestID = newID['num']+1;
        for (oldID = comicListText['comicList'].length + 1; oldID < latestID; oldID++) {
            console.log(oldID);
            data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
            data = data.responseJSON;
            if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
            }
        }
        chrome.storage.local.set({'comicList': comicList});
        console.log('list saved');
    } catch (e) {
        console.log('couldn\'t access web server');
        try {
            comicList = [];
            comicListText = JSON.parse($.ajax({url: 'http://parallaxgame.com/comicList.json', async: false, timeout: 3000}).responseText);
            console.log(comicListText);
            comicList = comicList.concat(comicListText['comicList']);
            newID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false});
            newID = newID.responseJSON;
            latestID = newID['num']+1;
            for (oldID = comicListText['comicList'].length + 1; oldID < latestID; oldID++) {
                console.log(oldID);
                data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
                data = data.responseJSON;
                if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                    comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
                }
            }
            chrome.storage.local.set({'comicList': comicList});
            console.log('list saved');
        } catch (e) {
            console.log('couldn\'t access dan\'s web server');
            comicList = [];
            comicListText = JSON.parse($.ajax({url: chrome.extension.getURL("comicList.json"), async: false}).responseText);
            console.log(comicListText);

            newID = $.ajax({url: 'http://xkcd.com/info.0.json', async: false});
            newID = newID.responseJSON;
            latestID = newID['num'] + 1;

            chrome.storage.local.get(null, function (e) {
                var data;
                if (e['comicList']) {
                    console.log('it is there');
                    comicList = comicList.concat(e['comicList']);
                    for (var oldID = e['comicList'].length + 1; oldID < latestID; oldID++) {
                        data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
                        data = data.responseJSON;
                        if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                            comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
                        }
                    }
                } else {
                    console.log('it is not there');
                    comicList = comicList.concat(comicListText['comicList']);
                    for (var i = 1681; i < latestID; i++) {
                        data = $.ajax({url: 'http://xkcd.com/' + i + '/info.0.json', async: false});
                        data = data.responseJSON;
                        if (!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                            comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
                        }
                    }
                }
                chrome.storage.local.set({'comicList': comicList});
                console.log('list saved');
            });
        }
    }
}

loadList();

window.setInterval(function () {
    loadList();
}, 21600000);
