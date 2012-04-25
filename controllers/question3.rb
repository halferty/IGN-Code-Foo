require_relative '../helpers/question3.rb'

get '/question3/:population' do		

	population = params[:population].to_i
	total, numbers, letters, excess = calc(population)
	
	pattern = patternify(numbers, letters)

	pattern + "|" + total + "|" + excess
end


