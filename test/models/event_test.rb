require 'test_helper'

class EventTest < ActiveSupport::TestCase
  setup do
    @event = events(:event_one)
    @user_two = users(:user_two)
    @vote1 = votes(:vote_1)
  	@vote2 = Vote.new({user_id: @user_two.id, event_id: @event.id, value: 1 }).save
  	@vote3 = Vote.new({user_id: @user_two.id, event_id: @event.id, value: 1 }).save
  	@vote4 = Vote.new({user_id: @user_two.id, event_id: @event.id, value: -1 }).save
  	@vote5 = Vote.new({user_id: @user_two.id, event_id: @event.id, value: -1 }).save
  end
  
  test "favourited?" do
    assert_equal( false, Event.favourited?(@user_two, @event.id))
  end

  test "test_upvotes" do
		assert_equal(2, @event.upvotes)
  end

  test "test_downvotes" do
  	assert_equal(2, @event.downvotes)
  end

  test "test_tally_votes" do
  	assert_equal(0, @event.tally_votes)
  end


end
