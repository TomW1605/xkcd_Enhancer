var comicList = [];
var comicListJson = JSON.parse($.ajax({url: chrome.extension.getURL('comicList.json'), async: false}).responseText);
function has(obj, value) {
    for (var id in obj) {
        if (obj[id] == value) {
            return true;
        }
    }
    return false;
}

/*var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://xkcd.com/archive/', true);
xhr.onload = function () {
    comicList = xhr.responseText;
    comicList = comicList.replace(/^([\s\S]*)(\(Hover mouse over title to view publication date\)<br \/><br \/>)(\s\s\s)/g, '');
    comicList = comicList.replace(/(\s\s\s)(<\/div>)(\s)(<div id="bottom" class="box">)([\s\S]*)$/g, '');
    comicList = comicList.replace(/((\n\n\n\n)|(\n\n\n\n\n\n))(?=<a)/g, '\n');
    comicList = comicList.replace(/(<\/a><br\/>)/g, '');
    comicList = comicList.replace(/(\/")( title=")(\S*)(">)/g, '_');
    comicList = comicList.replace(/(<a href="\/)/g, '');
    comicList = comicList.replace(/(<)([\s\S]*?)(>)/g, '');
    comicList = comicList.split(/\n/);
    comicList = comicList.reverse();
    console.log(comicList);
    for (var i=0; i<comicList.length; i++) {
        $.getJSON('http://xkcd.com/'+(i+1)+'/info.0.json', function (data) {
            console.log(data);
            var titleText = data.alt;

        });
    }

    return comicList;
};
xhr.send();/**/

/*const latestid = (function () {
    const refid = 1411;
    const refTime = new Date(2014, 7, 22).getTime();

    const daysSinceRef = (Date.now() - refTime) / (1000 * 60 * 60 * 24) | 0;

    return refid + 3 / 7 * daysSinceRef | 0;
})();*/

var newID = $.ajax({url:'http://xkcd.com/info.0.json', async: false});
newID = newID.responseJSON;
var latestID = newID['num']+1;

chrome.storage.local.get(null, function (e) {
    var data;
    if (!e['comicList']) {
        console.log('it is not there');
        comicList = comicList.concat(comicListJson['comicList']);
        for (var i = 1681; i < latestID; i++) {
            data = $.ajax({url:'http://xkcd.com/' + i + '/info.0.json', async: false});
            data = data.responseJSON;
            if(!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
            }
        }
    } else {
        console.log('it is there');
        comicList = comicList.concat(e['comicList']);
        for (var oldID = e['comicList'].length+1; oldID < latestID; oldID++) {
            data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
            data = data.responseJSON;
            if(!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
            }
        }
    }
    chrome.storage.local.set({'comicList':comicList});
    console.log('list saved');
});


window.setInterval(function () {
    chrome.storage.local.get(null, function (e) {
        var data;
        comicList = comicList.concat(e['comicList']);
        for (var oldID = e['comicList'].length+1; oldID < latestID; oldID++) {
            data = $.ajax({url: 'http://xkcd.com/' + oldID + '/info.0.json', async: false});
            data = data.responseJSON;
            if(!has(comicList, data['num'] + '_' + data['title'] + '_' + data['alt'])) {
                comicList.push(data['num'] + '_' + data['title'] + '_' + data['alt']);
            }
        }
        chrome.storage.local.set({'comicList':comicList});
        console.log('list saved');
    });
}, 43200000);/**/
