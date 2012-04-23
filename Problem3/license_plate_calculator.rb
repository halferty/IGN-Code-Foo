# license_plate_calculator.rb
#
# Calculates how many letters and numbers must be on a license
# plate to account for a given population of drivers.
#
# There are probably heavily-mathy ways to calculate this
# combinatorially, but I'm no mathematician. Instead, I'll
# count up through the combinations and stop when I find
# one that 'fits'.
#
# The license plates will follow this pattern:
#
# License plate characters	Max. population covered
#
# <num>				10
# <letter>			26
# <num><num>			100
# <num><letter>			260
# <letter><letter>		676
# <num><num><num>		1000
#
# To accomplish this, I'll use the following rules:
#
# 1. If all locations are letters, add a location and set all 
#	locations to numbers.
#
# 2. Otherwise, set the rightmost number to a letter.
#
#
#
# This program is exposed as an API using sinatra.

require 'sinatra'

get '/calc/:population' do
	req_pop = params[:population].to_i
	max_pop = 0
	plate = Array.new(1, :number)
	done = false
	loop do	
		# Maximum population that is covered by current combination
		max_pop = (plate.count(:letter)*26) * (plate.count(:number)*10)

		# Loop until we surpass the requires population
		break if max_pop >= req_pop

		if max_pop < req_pop
			# If all positions are letters
			if plate.count(:letter) == plate.size
				# Add a position and set all to numbers
				plate.push(:number)
				plate.fill(:number)
			else
				# Otherwise, set a number to a letter
				plate[plate.index(:number)] = :letter
			end
		end
	end

	# Print results
	@req_pop = req_pop
	@numbers = plate.count(:number)
	@letters = plate.count(:letter)
	@total = max_pop
	@excess = max_pop - req_pop
	
	erb :results	
end

__END__

@@layout
<html>
	<body>
		<%= yield%>
	</body>
</html>

@@results
<div style="width:30%">
	<ul>
		<li>Population: <span style="float:right">
			<%= @req_pop %></span></li>
		<li>Pattern: <span style="float:right">
			<%= @numbers %> numbers,
			<%= @letters %> letters</span></li>
		<li>Total plates: <span style="float:right">
			<%= @total %></span></li>
		<li>Excess Plates: <span style="float:right">
			<%= @excess %></span></li>
	</ul>
</div>
