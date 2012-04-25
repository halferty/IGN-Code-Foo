require 'sinatra/base'

class CodeFoo < Sinatra::Base
	get('/') do
		return "hi"
	end

	get '/1' do
		return "ih"
	end
end
