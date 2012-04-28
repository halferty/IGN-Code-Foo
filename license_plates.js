// Question 3

// For a given population, find the least number of characters required
// on a license plate. Each character can be numeric (in the 0-9 range)
// or alphabetic (in the A-Z range).

function calculatePlates(population) {

	// Clear the results if the population field is empty.
	if (population == "") {
		$("#pattern, #total, #excess").text("");
	} else {
		// Do the calculation
		numeric = 1;
		alphabetic = 0;
		total = 0;
		while (total < population) {
			if (numeric == 0) {
				numeric = alphabetic + 1;
				alphabetic = 0;
			} else {
				numeric--;
				alphabetic++;
			}
			total = countPlates(numeric, alphabetic);
		}
	
		// Format the pattern with pluralization and/or a comma
		pattern = (	((numeric > 0)? (numeric + " number" + 
					((numeric > 1)? "s" : "") + 
					((alphabetic > 0)? ", " : "")) : "") + 
					((alphabetic > 0)? (alphabetic + " letter" + 
					((alphabetic > 1)? "s" : "")) : "")
					);
	
		// Now update the DOM objects to reflect the new values
		$("#pattern").text(pattern);
		$("#total").text(total);
		$("#excess").text(total - population);
	}
}

// Counts the number of plates possible with a given number of
// numeric andalphabetic characters.
//
// total = 10^numberic + 26^alphabetic

function countPlates(numeric, alphabetic) {
	return	(((numeric > 0)? Math.pow(10, numeric) : 1) * ((alphabetic > 0)? Math.pow(26, alphabetic) : 1));
}
