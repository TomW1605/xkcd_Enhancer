document.onkeydown = checkNav;

function checkNav(e) {
    e = e || window.event;
	var comicNav = document.querySelectorAll(".comicNav");
    if (comicNav.length == 0) {
        return;
    }
    if (e.keyCode == '37') {
        self.location = comicNav[0].children[1].children[0].href;
    } else if (e.keyCode == '39') {
        self.location = comicNav[0].children[3].children[0].href;
    } else if (e.keyCode == '38') {
        self.location = comicNav[0].children[2].children[0].href;
    } else {

    }
}

document.addEventListener('load', function () {
	// not every comic img is in the comic div, sometimes you have links or other stuff
	// recurse down the DOM starting from comic until you hit an <img>
	var findComic = function(div) {
		var children = div.children;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.tagName === "IMG") return child;
			else if (child.children.length > 0 ) return findComic(child);
		}
		return null;
	};
	var comic = document.getElementById("comic");
	if (comic === null ) return;
	if (window.lazyXKCD === undefined) {
		window.lazyXKCD = true;
		var image = findComic(comic);
		var paragraph = document.createElement("p");
		paragraph.innerHTML = image.title;
		paragraph.id = "lazyXKCDParagraph";
		var padding = "25px";
		paragraph.style.paddingLeft = padding;
		paragraph.style.paddingRight = padding;
		comic.appendChild(paragraph);
	}
}, true);

var theDiv = document.getElementById("middleContainer");

var id = document.querySelectorAll(".comicNav")[0].children[1].children[0].href;
id = id.replace('http://xkcd.com/', '');
id = id.replace('/', '');
id = parseInt(id)+1;

var imageURL = theDiv.innerHTML;
imageURL = imageURL.replace(/^([\s\S]*)(hotlinking\/embedding\): )/g, '');
imageURL = imageURL.replace(/(<div id="transcript")([\s\S]*)$/g, '');

theDiv.innerHTML = theDiv.innerHTML.replace(/(Permanent link)([\s\S]*)(png|jpg)/, 'Permanent link to this comic: <a title="permanent link to this comic" href="http://xkcd.com/'+id+'/">http://xkcd.com/'+id+'/</a><br>Image URL (for hotlinking/embedding): <a title="link to this comic\'s image" href="'+imageURL+'">'+imageURL+'</a><br>This comic\'s explain xkcd page: <a title="link to explain xkcd" href="http://www.explainxkcd.com/wiki/index.php/'+id+'">http://www.explainxkcd.com/wiki/index.php/'+id+'</a>');
