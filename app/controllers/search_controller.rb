class SearchController < ApplicationController
	protect_from_forgery with: :null_session


	def index
		# raise
	end

	def do_search
		@fringebot = Fringebot.new(search_params.to_hash)
		@events = @fringebot.get_events
	end

	# def do_search
	# 		@fringebot = Fringebot.new(params)
	# 		@events = @fringebot.get_events
	# 		raise
	# 		respond_to do |format|
	# 			format.html 'do_search.html.erb'
	# 			format.json { render json: @results }
	# end

	# def form
	# 	respond_to do |format|
	# 		format.html 'index.html.erb'
	# 		# format.json { render json: @results }
	# 		# end
	# 	end
	# end

	private
	# Never trust parameters from the scary internet, only allow the white list through.
	def search_params
		params.permit("title_string", "artist", "year", "festival_string")
	end

end