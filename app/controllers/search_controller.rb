class SearchController < ApplicationController
	protect_from_forgery with: :null_session

	def create
		title_string = params[:title]
		fb = Fringebot.new()
		results = fb.search(title_string)
		render json:results
	end

end
