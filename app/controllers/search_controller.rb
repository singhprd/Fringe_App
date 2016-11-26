class SearchController < ApplicationController
	protect_from_forgery with: :null_session

	def do_search
		fb = Fringebot.new()
		@results = fb.search(params)
		@results
	end

end
