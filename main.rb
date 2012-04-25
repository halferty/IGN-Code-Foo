require 'sinatra'

Dir["./app/controllers/*.rb"].each { |file| require file }
Dir["./app/helpers/*.rb"].each { |file| require file }

