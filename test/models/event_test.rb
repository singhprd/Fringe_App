require 'test_helper'

class EventTest < ActiveSupport::TestCase
  setup do
    @event = events(:event_one)
    @user_two = users(:user_two)
  end
  
  test "favourited?" do
    assert_equal( false, Event.favourited?(@user_two, @event.id))
  end

end
