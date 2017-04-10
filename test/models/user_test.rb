require 'test_helper'

class UserTest < ActiveSupport::TestCase
	setup do
    @event = events(:event_one)
    @new_event = events(:new_event)
    @user_two = users(:user_two)
    @admin_user_one = users(:admin_user_one)
  end
  
  test "test_has_10_votes_by_default" do
    assert_equal(10, @user_two.votes_left)
  end
  
  test "reduce_votes_left" do
  	assert @user_two.reduce_votes_left
    assert_equal(9, @user_two.votes_left)
  end

  test "votes_dont_go_negative" do
  	@user_two.votes_left = 2
  	@user_two.save
  	assert @user_two.reduce_votes_left
    assert_equal(1, @user_two.votes_left)
  	assert @user_two.reduce_votes_left
  	assert_equal false, @user_two.reduce_votes_left
  	assert_equal 0, @user_two.votes_left
  end

end
