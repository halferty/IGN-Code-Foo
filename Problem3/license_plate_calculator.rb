# license_plate_calculator.rb
#
# Calculates how many letters and numbers must be on a license
# plate to account for a given population of drivers.
#
# This program is exposed as an API using sinatra.
# It's actually running at
#

require 'sinatra'

#
# Set up a route
#
get '/calc/:population' do	
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



# The ERB HTML layout 

__END__

@@layout
<html><body><%= yield%></body></html>

@@results
<div style="width:30%">
	<ul>
		<li>Population: <span style="float:right">
			<%= @population %></span></li>

		<li>Pattern: <span style="float:right">
			<%= @pattern %></span></li>

		<li>Total plates: <span style="float:right">
			<%= @total %></span></li>

		<li>Excess Plates: <span style="float:right">
			<%= @excess %></span></li>
	</ul>
</div>

