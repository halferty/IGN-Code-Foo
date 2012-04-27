
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
		while (countPlates(numeric, alphabetic) < population) {
			if (numeric == 0) {
				// If all characters are alphabetic
				numeric = alphabetic + 1;
				alphabetic = 0;
			} else {
				numeric--;
				alphabetic++;
			}
		}
	
		// Format the pattern with pluralization and/or a comma
		pattern = "";
		if (numeric > 0) {
			pattern += numeric + " number";
			if (numeric > 1) {
				pattern += "s";
			}
		}
		if ((numeric > 0) && (alphabetic > 0)) {
			pattern += ", ";
		}
		if (alphabetic > 0) {
			pattern += alphabetic + " letter";
			if (alphabetic > 1) {
				pattern += "s";
			}
		}
	
		// Now update the DOM objects to reflect the new values
		$("#pattern").text(pattern);
		total = countPlates(numeric, alphabetic);
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
