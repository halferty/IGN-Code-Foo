require 'sinatra'

Dir["./controllers/*.rb"].each { |file| require file }
Dir["./helpers/*.rb"].each { |file| require file }

