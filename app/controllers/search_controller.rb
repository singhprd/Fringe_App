class SearchController < ApplicationController
	protect_from_forgery with: :null_session
	# before_filter :authenticate_user!

	def do_search
		fb = Fringebot.new()
		@results = fb.search(params)
		@results
	end

end
