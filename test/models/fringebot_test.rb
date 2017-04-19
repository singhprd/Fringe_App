require 'test_helper'

# TODO Give example hashes for each type
class FringebotTest < ActiveSupport::TestCase
	setup do
		params = {"title_string"=>"", "artist"=>"", "year"=>"2016", "festival_string"=>"book"}
		@fringebot = Fringebot.new(params)
		@api_response = @fringebot.query_api
		@results = @fringebot.get_events
	end

	test "search returns an array of events" do
		assert_equal Array, @results.class
		assert_equal Event, @results.first.class
	end

	test "create venue params hash" do
		results = @fringebot.query_api()
		assert_equal Hash, @fringebot.create_venue_params(results.first).class
	end
	
	test "create event params hash" do
		results = @fringebot.query_api()
		assert_equal Hash, @fringebot.create_event_params(results.first).class
	end

	test "create performances params array" do
		assert_equal Array, @fringebot.create_performances_params_array(@api_response.first).class
		assert_equal [Hash], @fringebot.create_performances_params_array(@api_response.first).map(&:class).uniq
	end
	
	test "filtering to book festival returns only book festival results" do
		book_params = {"title_string"=>"", "artist"=>"", "year"=>"2016", "festival_string"=>"book"}
		book_events = Fringebot.new(book_params).get_events
		assert_equal ["book"], book_events.map(&:festival_id).uniq
	end

	test "filtering to hogmanay returns only hogmanay festival results" do
		hogmanay_params = {"title_string"=>"", "artist"=>"", "year"=>"2016", "festival_string"=>"hogmanay"}
		hogmanay_events = Fringebot.new(hogmanay_params).get_events
		assert_equal ["hogmanay"], hogmanay_events.map(&:festival_id).uniq
	end

	test "title search works for Suntan in Film Festival 2016" do
		suntan_params = {"title_string"=>"Suntan", "artist"=>"", "year"=>"2016", "festival_string"=>""}
		suntan_results = Fringebot.new(suntan_params).get_events
		event = suntan_results.first
		assert_equal 1, suntan_results.count
		assert_equal "Film", event.genre
		assert_equal "Suntan", event.title
	end

end
