require_relative '../helpers/question3.rb'

get '/question3/:population' do		

	population = params[:population].to_i
	@total,
	@numbers,
	@letters,
	@excess = calc(population)
	
	# Decides if a comma should appear in the pattern result,
	# and if plural nouns should be used
	@pattern =	((@numbers > 0)? (@numbers.to_s + " number" + 
			((@numbers > 1)? "s" : "")) : "") +
			(((@numbers > 0) and (@letters > 0))? ", " : "") +
			((@letters > 0)? (@letters.to_s + " letter" +
			((@letters > 1)? "s" : "")) : "")

	@title = 'Question 3 - license plate calculation'	
	erb :results	
end


