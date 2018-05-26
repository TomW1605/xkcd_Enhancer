const StorageAreaSync = chrome.storage.sync;
const StorageAreaLocal = chrome.storage.local;

function has(obj, value) {
    for (var id in obj) {
        if (obj[id] == value) {
            return true;
        }
    }
    return false;
}

function importSettings() {
    var e = document.getElementById("settingsFile").files;
    var i = new FileReader;
    i.onloadend = function () {
        return function (e) {
            var settings = JSON.parse(e.target['result']);

            var sync = settings['sync'];
            StorageAreaSync.set({'Link3DToggle': sync['Link3DToggle']});
            StorageAreaSync.set({'arrowNavigation': sync['arrowNavigation']});
            StorageAreaSync.set({'explainLinkToggle': sync['explainLinkToggle']});
            StorageAreaSync.set({'favouritesButtonToggle': sync['favouritesButtonToggle']});
            StorageAreaSync.set({'fixRandom': sync['fixRandom']});
            StorageAreaSync.set({'imageLinkToggle': sync['imageLinkToggle']});
            StorageAreaSync.set({'keyboardNavigation': sync['keyboardNavigation']});
            StorageAreaSync.set({'permanentLinkToggle': sync['permanentLinkToggle']});
            StorageAreaSync.set({'titleTextMover': sync['titleTextMover']});
            StorageAreaSync.set({'newBadge': sync['newBadge']});
            StorageAreaSync.set({'newNotification': sync['newNotification']});


            StorageAreaLocal.get(null, function (syncData) {
                var historyList = [];
                historyList = historyList.concat(syncData['history']);
                for (var i = 0; i < sync['history'].length; i++) {
                    var id = sync['history'][i];
                    if (!has(historyList, id)) {
                        if (historyList.length == 1000) {
                            historyList.shift();
                            historyList.push(id);
                        } else {
                            historyList.push(id);
                        }
                    }
                }
                if (historyList[0] == null) {
                    historyList.shift();
                }
                StorageAreaSync.set({'history': historyList});
            });
            
            var local = settings['local'];
            StorageAreaLocal.get(null, function (localData) {
                var favouritesIDList = [];
                favouritesIDList = favouritesIDList.concat(localData['favouritesID']);

                var favouritesNameList = [];
                favouritesNameList = favouritesNameList.concat(localData['favouritesName']);

                for (var i = 0; i < local['favouritesID'].length; i++) {
                    var id = local['favouritesID'][i];
                    if (!has(favouritesIDList, id)) {
                        favouritesIDList.push(id);
                    }

                    var name = local['favouritesName'][i];
                    if (!has(favouritesNameList, name)) {
                        favouritesNameList.push(name);
                    }
                }
                if (favouritesIDList[0] == null) {
                    favouritesIDList.shift();
                    favouritesNameList.shift();
                }
                StorageAreaLocal.set({'favouritesID': favouritesIDList});
                StorageAreaLocal.set({'favouritesName': favouritesNameList});
            });
        }
    }(e[0]), i.readAsText(e[0])
}

function exportSettings() {
    console.log('export');
    StorageAreaSync.get(null, function (sync) {
        StorageAreaLocal.get(null, function (local) {
            delete local['comicList'];
            //console.log(sync);
            //console.log(local);
            var result={
                'sync':sync,
                'local':local
            };
            console.log(result);
            //var d = new Date().toLocaleString().replace('/','-').replace('/','-').replace(':','-').replace(':','-').replace(',','');
            var d = moment().format('YYYYMMDDhhmmss');
            var doc = URL.createObjectURL(new Blob([JSON.stringify(result)], {type: 'application/octet-binary'}));
            chrome.downloads.download({url:doc,filename:'xkcdEnhancerSettings '+d+'.json'})
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {

    $("#choose").click(function () {
        console.log('choose');
        $("#settingsFile").trigger('click');
        return false;
    });

    document.getElementById('export').addEventListener('click', exportSettings);
    document.getElementById('import').addEventListener('click', importSettings);

    $('input[type=file]').change(function () {
        var input = $(this);
        if (input[0].files && input[0].files[0]) {
            var file = input[0].files[0];
            if (file) {
                $('#filename').html('File: '+file.name);
                document.getElementById('import').removeAttribute('disabled');
            }

        }
    });
});