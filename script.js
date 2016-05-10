var badIDs = [1663, 1608, 1110, 1350, 1506, 1525, 1193]

var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
id = id.replace(/^([\s\S]*)(com\/)/g, '');
id = id.replace(/(\/)([\s\S]*)$/g, '');
console.log(id)
id = parseInt(id)+1;

if(!(badIDs.indexOf(id)>=0)) {
    document.onkeydown = checkNav;


    function checkNav(e) {
        e = e || window.event;
        var comicNav = document.querySelectorAll(".comicNav");
        if (comicNav.length == 0) {
            return;
        }
        if (e.keyCode == '37') {
            self.location = comicNav[0].children[1].children[0].href
        } else if (e.keyCode == '39') {
            self.location = comicNav[0].children[3].children[0].href;
        } else if (e.keyCode == '38') {
            self.location = comicNav[0].children[2].children[0].href;
        } else if (e.keyCode == '32') {
            self.location = comicNav[0].children[2].children[0].href;
        } else {

        }
    }


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
        if (comic === null) return;
        if (window.titleText === undefined) {
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
    }, true);


    var theDiv = document.getElementById("middleContainer");

    var imageURL = theDiv.outerHTML;
    imageURL = imageURL.replace(/^([\s\S]*)(hotlinking\/embedding\): )/g, '');
    imageURL = imageURL.replace(/(<div id="transcript")([\s\S]*)$/g, '');
    if (id <= 880) {
        theDiv.outerHTML = theDiv.outerHTML.replace(/(Permanent link)([\s\S]*)((png|jpg)|http:\/\/imgs.xkcd.com\/comics\/)/, 'Permanent link to this comic: <a title="permanent link to this comic" href="http://xkcd.com/' + id + '/">http://xkcd.com/' + id + '/</a><br>Image URL (for hotlinking/embedding): <a title="link to this comic\'s image" href="' + imageURL + '">' + imageURL + '</a><br>This comic\'s explain xkcd page: <a title="link to explain xkcd" href="http://www.explainxkcd.com/wiki/index.php/' + id + '">http://www.explainxkcd.com/wiki/index.php/' + id + '</a><br>3D version of this comic: <a title="link to 3D comic" href="http://xk3d.xkcd.com/' + id + '">http://xk3d.xkcd.com/' + id + '</a>');
    } else {
        theDiv.outerHTML = theDiv.outerHTML.replace(/(Permanent link)([\s\S]*)((png|jpg)|http:\/\/imgs.xkcd.com\/comics\/)/, 'Permanent link to this comic: <a title="permanent link to this comic" href="http://xkcd.com/' + id + '/">http://xkcd.com/' + id + '/</a><br>Image URL (for hotlinking/embedding): <a title="link to this comic\'s image" href="' + imageURL + '">' + imageURL + '</a><br>This comic\'s explain xkcd page: <a title="link to explain xkcd" href="http://www.explainxkcd.com/wiki/index.php/' + id + '">http://www.explainxkcd.com/wiki/index.php/' + id + '</a>');
    }
}