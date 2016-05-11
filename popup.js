document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('permanentLinkToggle').addEventListener('click', permanentLinkCheckboxToggled);
    document.querySelector('imageLinkToggle').addEventListener('click', imageLinkToggleCheckboxToggled);
    document.querySelector('explainLinkToggle').addEventListener('click', explainLinkToggleCheckboxToggled);
    document.querySelector('Link3DToggle').addEventListener('change', Link3DToggleCheckboxToggled);
});

function add(text){
    document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+text;
    console.log(text)
}

var permanentLinkToggle ;
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
    add('<br>permanentLinkToggle: '+permanentLinkToggle);
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
    add('<br>imageLinkToggle: '+imageLinkToggle);
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
    add('<br>explainLinkToggle: '+explainLinkToggle);
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
    add('<br>Link3DToggle: '+Link3DToggle);
}