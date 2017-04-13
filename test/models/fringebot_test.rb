require 'test_helper'

# TODO Give example hashes for each type
class FringebotTest < ActiveSupport::TestCase
	setup do
		@fringebot = Fringebot.new({title: "abc"})
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



end
