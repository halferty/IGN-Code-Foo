require_relative '../helpers/question3.rb'

get '/question3/:population' do		

	@population = params[:population].to_i
	@total, @numbers, @letters, @excess = calc(@population)
	
	@pattern = patternify(@numbers, @letters)

	@title = 'Question 3 - license plate calculation'	
	erb :results	
end


