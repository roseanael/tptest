//DEBUT VALIDATE

$.validator.setDefaults({
	highlight : function(input) {
		$(input).addClass("ui-state-highlight");
		$(input).parent().addClass("error");
	},
	unhighlight : function(input) {
		$(input).removeClass("ui-state-highlight");
		$(input).parent().removeClass("error");
	}
});

$.validator.addMethod(
	    "frenchDate",
	    function(value, element) {
	        // put your own logic here, this is just a (crappy) example
	        return value.match(/^\d\d-\d\d-\d\d\d\d$/);
	    },
	    "Please enter a date in the format dd-mm-yyyy."
	);

$(document).ready(function() {
	$.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
	$("#date").datepicker();
	$("#remarques").markItUp(mySettings);

	$("#form2").validate({
		rules : {
			firstname: {
				required: true,
					minlength: 5
			},
			lastname: {
				required:true,
				minlength: 5
			},
			
			email : {
				required : true,
				email : true
			},
			
			date : {
				required : true,
				date : true
			},
			

		},
		messages : {
			firstname : {
				required : "Entrez votre nom",
				minlength : "Au moins 5 caractères",
			},
			lastname : {
				required : "Entrez votre prénom",
				minlength : "Au moins 5 caractères",
			},
			email : {
				required : "Entrez votre email",
				email : "Entrez un email valide"
			},
			date : {
				required : "Entrez votre date de naissance",
				date : "Entrez une date valide"
			},
			
		},
		success : function(label) {
			label.html("✔ Ok !").addClass("checked");
		},
		submitHandler: function() {
			alert("Nous venons de recevoir le formulaire, Merci!");
		}		
	});

	
});

//Fin Validate