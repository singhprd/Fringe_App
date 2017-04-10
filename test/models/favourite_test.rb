require 'test_helper'

class FavouriteTest < ActiveSupport::TestCase
	
	setup do
		@user_two = users(:user_two)
    @event = events(:event_one)
  	@vote = Vote.create({user_id: @user_two.id, event_id: @event.id, value: 1 }).save
  	@favourite = Favourite.create({event: @event, user: @user_two})
	end

  test "easy_find_both_params" do
    assert_equal(@favourite, Favourite.easy_find({event_id: @event.id, user_id: @user_two.id}))
  end

  test "easy_find_user" do
    assert_equal(@favourite, Favourite.easy_find({user_id: @user_two.id}).first)
  end

  test "easy_find_returns_collection" do
    assert(Favourite.easy_find({user_id: @user_two.id}).is_a?(Favourite::ActiveRecord_Associations_CollectionProxy))
  end

  test "easy_find_event" do
    assert_equal(@favourite, Favourite.easy_find({event_id: @event.id}).first)
    assert_equal(@favourite, Favourite.easy_find({event_id: @event.id}).first)
  end


end
