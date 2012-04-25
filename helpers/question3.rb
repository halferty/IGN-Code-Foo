# Calculates the number of plates possible with a given number of
# letters and numbers
def plates(numbers, letters)
	return	((numbers == 0)? 1 : (10 ** numbers)) *
		((letters == 0)? 1 : (26 ** letters))
end
