require 'sinatra'

set :public_folder, 'public'

get '/' do
  erb :index
end

get '/about' do
  erb :about
end
