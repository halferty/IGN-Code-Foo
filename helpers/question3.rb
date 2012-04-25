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

def plates(numbers, letters)
	return	((numbers == 0)? 1 : (10 ** numbers)) *
		((letters == 0)? 1 : (26 ** letters))
end

