require 'test_helper'

class EventTest < ActiveSupport::TestCase
  setup do
    @event = Fabricate(:event)
    @user = Fabricate(:user)
    @vote1 = Vote.create({user_id: @user.id, event_id: @event.id, value: 1 })
  	@vote2 = Vote.create({user_id: @user.id, event_id: @event.id, value: 1 })
  	@vote3 = Vote.create({user_id: @user.id, event_id: @event.id, value: 1 })
  	@vote4 = Vote.create({user_id: @user.id, event_id: @event.id, value: -1 })
  	@vote5 = Vote.create({user_id: @user.id, event_id: @event.id, value: -1 })
  end
  
  test "favourited?" do
    assert_equal( false, Event.favourited?(@user, @event.id))
  end

  test "count upvotes" do
		assert_equal(3, @event.upvotes)
  end

  test "count downvotes" do
  	assert_equal(2, @event.downvotes)
  end

  test "tally votes" do
  	assert_equal(1, @event.tally_votes)
  end


end
