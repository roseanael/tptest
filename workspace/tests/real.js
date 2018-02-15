window.addEventListener('load', function() {
	var modale = document.querySelector("#myModal");
	var bouton = document.querySelector("#myBtn");
	var span = document.querySelector(".close");
	
	bouton.addEventListener('click', function() {
	    modale.style.display = "block";
	});

	// When the user clicks on <span> (x), close the modal
	span.addEventListener('click', function() {
	    modale.style.display = "none";
	});

	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener('click',  function(event) {
	    if (event.target == modale) {
	        modale.style.display = "none";
	    }
	});

});