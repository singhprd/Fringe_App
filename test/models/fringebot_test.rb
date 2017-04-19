require 'test_helper'

# TODO Give example hashes for each type
class FringebotTest < ActiveSupport::TestCase
	setup do
		@fringebot = Fringebot.new({title_string: "FAKE"})
		@fringebot_book = Fringebot.new({festival_string: "book"})
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
		book_events = @fringebot_book.get_events
		assert_equal false, book_events
	end

end
