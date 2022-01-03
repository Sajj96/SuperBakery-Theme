/* Description: Custom JS file */

/* Navigation*/
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
	scrollFunction();
	scrollFunctionBTT(); // back to top button
};

window.onload = function () {
	scrollFunction();
	owlCarouselConfig();
};

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById("navbarExample").classList.add("top-nav-collapse");
	} else if ( document.documentElement.scrollTop < 30 ) {
		document.getElementById("navbarExample").classList.remove("top-nav-collapse");
	}
}

// Navbar on mobile
let elements = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", () => {
		document.querySelector(".offcanvas-collapse").classList.toggle("open");
	});
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  	document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest(".dropdown");
	let _m = document.querySelector(".dropdown-menu", _d);

	setTimeout(
		function () {
		const shouldOpen = _d.matches(":hover");
		_m.classList.toggle("show", shouldOpen);
		_d.classList.toggle("show", shouldOpen);

		_d.setAttribute("aria-expanded", shouldOpen);
		},
		e.type === "mouseleave" ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) { 
	document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
	document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

	// On click
	document.querySelector(".dropdown").addEventListener("click", (e) => {
		const _d = e.target.closest(".dropdown");
		let _m = document.querySelector(".dropdown-menu", _d);
		if (_d.classList.contains("show")) {
			_m.classList.remove("show");
			_d.classList.remove("show");
		} else {
			_m.classList.add("show");
			_d.classList.add("show");
		}
	});
}
  

/* Image Slider - Swiper */
var imageSlider = new Swiper('.image-slider', {
	autoplay: {
		delay: 3000,
		disableOnInteraction: false
	},
	loop: true,
	spaceBetween: 50,
	slidesPerView: 5,
	breakpoints: {
		// when window is <= 575px
		575: {
			slidesPerView: 1,
			spaceBetween: 10
		},
		// when window is <= 767px
		767: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		// when window is <= 991px
		991: {
			slidesPerView: 3,
			spaceBetween: 20
		},
		// when window is <= 1199px
		1199: {
			slidesPerView: 4,
			spaceBetween: 20
		},

	}
});


/* Back To Top Button */
// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		myButton.style.display = "block";
	} else {
		myButton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

function setAnimation(_elem, _InOut) {
	// Store all animationend event name in a string.
	// cf animate.css documentation
	var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

	_elem.each(function() {
		var $elem = $(this);
		var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

		$elem.addClass($animationType).one(animationEndEvent, function() {
			$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
		});
	});
}

function owlCarouselConfig() {
	var target = $('.owl-slider');
	if (target.length > 0) {
		target.each(function() {
			var el = $(this),
				dataAuto = el.data('owl-auto'),
				dataLoop = el.data('owl-loop'),
				dataSpeed = el.data('owl-speed'),
				dataGap = el.data('owl-gap'),
				dataNav = el.data('owl-nav'),
				dataDots = el.data('owl-dots'),
				dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
				dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
				dataDefaultItem = el.data('owl-item'),
				dataItemXS = el.data('owl-item-xs'),
				dataItemSM = el.data('owl-item-sm'),
				dataItemMD = el.data('owl-item-md'),
				dataItemLG = el.data('owl-item-lg'),
				dataItemXL = el.data('owl-item-xl'),
				dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='icon-chevron-left'></i>",
				dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='icon-chevron-right'></i>",
				duration = el.data('owl-duration'),
				datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
			if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 2) {
				el.owlCarousel({
					animateIn: dataAnimateIn,
					animateOut: dataAnimateOut,
					margin: dataGap,
					autoplay: dataAuto,
					autoplayTimeout: dataSpeed,
					autoplayHoverPause: true,
					loop: dataLoop,
					nav: dataNav,
					mouseDrag: datamouseDrag,
					touchDrag: true,
					autoplaySpeed: duration,
					navSpeed: duration,
					dotsSpeed: duration,
					dragEndSpeed: duration,
					navText: [dataNavLeft, dataNavRight],
					dots: dataDots,
					items: dataDefaultItem,
					responsive: {
						0: {
							items: dataItemXS
						},
						480: {
							items: dataItemSM
						},
						768: {
							items: dataItemMD
						},
						992: {
							items: dataItemLG
						},
						1200: {
							items: dataItemXL
						},
						1680: {
							items: dataDefaultItem
						}
					}
				});
				// Fired before current slide change
				el.on('change.owl.carousel', function(event) {
					var $currentItem = $('.owl-item', el).eq(event.item.index);
					var $elemsToanim = $currentItem.find("[data-animation-out]");
					setAnimation($elemsToanim, 'out');
				});

// Fired after current slide has been changed
				el.on('changed.owl.carousel', function(event) {
					var $currentItem = $('.owl-item', el).eq(event.item.index);
					var $elemsToanim = $currentItem.find("[data-animation-in]");
					setAnimation($elemsToanim, 'in');
				})
			}

		});
	}
}