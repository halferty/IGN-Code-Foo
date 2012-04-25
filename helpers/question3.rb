# Finds the smallest number of letters and numbers
# that can represent a given population.
def calc(population)
	numbers, letters = 1, 0
	while plates(numbers, letters) < population do
		if numbers == 0
			numbers = letters + 1
			letters = 0
		else
			numbers -= 1
			letters += 1
		end
	end
	total = plates(numbers, letters)
	excess = total - population
	return total, numbers, letters, excess
	
end

# Calculates the number of plates for a given number
# of numbers and letters
def plates(numbers, letters)
	return	((numbers == 0)? 1 : (10 ** numbers)) *
		((letters == 0)? 1 : (26 ** letters))
end

# Decides if a comma should appear in the pattern result,
# and if plural nouns should be used
def patternify(numbers, letters)
	pattern = ""
	if (numbers > 0) do
		pattern += numbers.to_s + " number"
		if (numbers > 1) do
			pattern += "s"
		end
	end
	if (numbers > 0 and letters > 0) do
		pattern += ", "
	end
	if (letters > 0) do
		pattern += letters.to_s + " letter"
		if (letters > 1) do
			pattern += "s"
		end
	end
	return pattern
end

			

