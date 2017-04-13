class SearchController < ApplicationController
	protect_from_forgery with: :null_session

	def do_search
		@results = Fringebot.search(params)
		@results
	end

end
