class LicensePlateCalculator
	attr_accessor :population, :numbers, :letters
 
	def initialize(population)
		@population = population
		@numbers = 1
		@letters = 0
	
		# Iterate through the combinations
		while plates < population do
			if numbers == 0
				@numbers = @letters + 1
				@letters = 0
			else
				@numbers -= 1
				@letters += 1
			end
		end
	end

	def plates
		return	((@numbers == 0)? 1 : (10 ** @numbers)) *
			((@letters == 0)? 1 : (26 ** @letters))
	end
	
	def excess
		return plates - population
	end
end

