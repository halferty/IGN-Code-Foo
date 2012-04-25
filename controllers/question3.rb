get '/question3/:population' do	
	population = params[:population].to_i
	
	# Start with one number, no letters
	numbers, letters = 1, 0
	
	# Iterate through the combinations
	while plates(numbers, letters) < population do
		if numbers == 0
			numbers = letters + 1
			letters = 0
		else
			numbers -= 1
			letters += 1
		end
	end

	# Format the results for the erb template
	@population = population
	@total = plates(numbers, letters)
	@excess = plates(numbers, letters) - population
	
	# Decides if a comma should appear in the pattern result,
	# and if plural nouns should be used
	@pattern =	((numbers > 0)? (numbers.to_s + " number" + 
			((numbers > 1)? "s" : "")) : "") +
			(((numbers > 0) and (letters > 0))? ", " : "") +
			((letters > 0)? (letters.to_s + " letter" +
			((letters > 1)? "s" : "")) : "")
	
	erb :results	
end

# Calculates the number of plates possible with a given number of
# letters and numbers
def plates(numbers, letters)
	return	((numbers == 0)? 1 : (10 ** numbers)) *
		((letters == 0)? 1 : (26 ** letters))
end

