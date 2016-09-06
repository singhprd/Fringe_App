class SearchController < ApplicationController
	protect_from_forgery with: :null_session

	def do_search
		title_string = params[:title]
		fb = Fringebot.new()
		@results = fb.search(title_string)
		@results
	end

end
