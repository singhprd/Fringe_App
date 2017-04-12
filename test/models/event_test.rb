require 'test_helper'

class EventTest < ActiveSupport::TestCase
  setup do
    @event = Fabricate(:event)
    @user = Fabricate(:user)
    10.times { Fabricate(:vote, event: @event, user: @user, value: 1) }
    5.times { Fabricate(:vote, event: @event, user: @user, value: -1) }
  end
  
  test "favourited?" do
    assert_equal( false, Event.favourited?(@user, @event.id))
  end

  test "count upvotes" do
		assert_equal(10, @event.upvotes)
  end

  test "count downvotes" do
  	assert_equal(5, @event.downvotes)
  end

  test "tally votes" do
  	assert_equal(5, @event.tally_votes)
  end

end
