/*
	event handling with Vanilla JavaScript

	user moves pointer over thumbnails to 
	  display enlarged, preview image

	html displays thumbnails of book covers
	css uses flexbox to display thumbnails

	use mouseenter, mousemove & mouseleave events
	to display enlarged image of a thumbnail

*/


const xRightOffset = 10; // px to right of pointer for preview image
const xLeftOffset = -340;  // px to left of pointer for preview image
const yOffset = -200;  // px above pointer for preview image
const previewSpace = 350;  // space needed for preview image

/*  user enters thumbnail image, add enlarged image to the DOM */
enterHandler = function(e) {
	if (e.target.tagName === 'IMG') {
		/* add enlarged image */
		var myElement = document.createElement('div');
		myElement.id = 'preview';
		e.target.parentNode.appendChild(myElement);

		var myImg = document.createElement('img');
		var imgLoc = e.target.src;
		myImg.src = imgLoc.substr(0, imgLoc.length-7) + '.jpg';
		myElement.appendChild(myImg);
		
		/* listen for user leaving or moving over thumbnail image */ 
		e.target.addEventListener('mousemove', moveHandler, false);
		e.target.addEventListener('mouseleave', leaveHandler, false);
	}
};

/* remove enlarged image when pointer leaves thumbnail */
leaveHandler = function(f) {
	var el = document.querySelector('#preview');
	el.parentNode.removeChild(el);
};

/* as pointer moves around thumbnail, move enlarged image */
moveHandler = function(d) {
	const imgRect = d.target.getBoundingClientRect();
	const carouselRect = document.querySelector('#carousel').getBoundingClientRect();
	var myElement = document.querySelector("#preview")

  /* position preview image */	
	myElement.style.top = d.offsetY + yOffset + 'px';
	/* display enlarged image to the left of thumbnail  */
	/* if space on the right is too small               */
	if ((imgRect.left + previewSpace) < carouselRect.width) {
		myElement.style.left = d.offsetX + xRightOffset + 'px'; 
	} 
	else {
		myElement.style.left = d.offsetX + xLeftOffset + 'px'; 
	}	
};
	
init = function() {
	document.querySelector('#carousel').addEventListener('mouseenter',enterHandler, true);
};

window.onload = function () {
	init();
};