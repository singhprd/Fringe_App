class SearchController < ApplicationController
	protect_from_forgery with: :null_session

	def do_search
		@fringebot = Fringebot.new(params)
		@events = @fringebot.get_events
	end

end
