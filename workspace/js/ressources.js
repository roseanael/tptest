// SMOOTH SCROLLING

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// FIN smooth scrolling


// // FLEXSLIDER
// $(document).ready(function(){
  
//     $('.flexslider').flexslider({
//       animation: "slide",
//       animationLoop: false,
//       itemWidth: 50,
//       itemMargin: 5,
//       minItems: 2,
//       maxItems: 4
//     });
  
//   $('#slider').flexslider({
// 	    animation: "slide",
// 	    controlNav: false,
// 	    animationLoop: false,
// 	    slideshow: false,
// 	    sync: "#carousel"
// 	  });
// });
// //FIN FLEXSLIDER

//CAROUSEL
// Next slide
$('.carousel').carousel('next');
$('.carousel').carousel('next', 3); // Move next n times.
// Previous slide
$('.carousel').carousel('prev');
$('.carousel').carousel('prev', 4); // Move prev n times.
// Set to nth slide
$('.carousel').carousel('set', 4);


//FIN CAROUSEL

