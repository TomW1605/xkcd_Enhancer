chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "http://c.xkcd.com/random/comic/";
    chrome.tabs.create({ url: newURL });
});