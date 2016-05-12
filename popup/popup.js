function add(text) {
    //document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+text;
    console.log(text);
}

var StorageArea = chrome.storage.local;

function retreve(name) {
    StorageArea.get(null, function (data) {
        console.info(data[name]);
        if(!data[name]){
            document.getElementById(name).removeAttribute("checked");
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('loaded');
    retreve('permanentLinkToggle');
    retreve('imageLinkToggle');
    retreve('explainLinkToggle');
    retreve('Link3DToggle');
    retreve('titleTextMover');
    retreve('keyboardNavigation');
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

var keyboardNavigation;
function keyboardNavigationToggled() {
    var checkbox = document.getElementById('keyboardNavigation').checked;
    if (!checkbox) {
        add('<br>keyboardNavigation: off');
        document.getElementById('keyboardNavigation').removeAttribute("checked");
        keyboardNavigation = false;
    } else {
        add('<br>keyboardNavigation: on');
        document.getElementById('keyboardNavigation').setAttribute("checked", "");
        keyboardNavigation = true;
    }
    StorageArea.set({'keyboardNavigation': keyboardNavigation});
}

document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("checkbox")) {
        document.getElementById('permanentLinkToggle').addEventListener('change', permanentLinkCheckboxToggled);
        document.getElementById('imageLinkToggle').addEventListener('change', imageLinkToggleCheckboxToggled);
        document.getElementById('explainLinkToggle').addEventListener('change', explainLinkToggleCheckboxToggled);
        document.getElementById('Link3DToggle').addEventListener('change', Link3DToggleCheckboxToggled);
        document.getElementById('titleTextMover').addEventListener('change', titleTextMoverToggled);
        document.getElementById('keyboardNavigation').addEventListener('change', keyboardNavigationToggled);
    }
});