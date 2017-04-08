require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @event = events(:event_one)
    @new_event = events(:new_event)
    @admin_user_one = users(:admin_user_one)
    sign_in @admin_user_one
  end

  test "should get is_favourited?" do
    get events_url
    assert_response :success
  end

  test "should get index" do
    get events_url
    assert_response :success
  end

  test "should get new" do
    get new_event_url
    assert_response :success
  end

  # TODO Fix
  # test "should create event" do
  #   assert_difference('Event.count') do
  #     post events_url, params: {event: {age_category: @new_event.age_category, artist: @new_event.artist, code: @new_event.code, description: @new_event.description, festival: @new_event.festival, festival_id: @new_event.festival_id, genre: @new_event.genre, latitude: @new_event.latitude, longitude: @new_event.longitude, status: @new_event.status, title: @new_event.title, updated: @new_event.updated, url: @new_event.url, website: @new_event.website, score: @new_event.score, venue: @new_event.venue}}
  #   end
  # end

  #   assert_redirected_to event_url(Event.last)
  # end

  test "should show event" do
    get event_url(@event)
    assert_response :success
  end

  # TODO Test Once Admin User Setup and Signed in
  test "should get edit" do
    get edit_event_url(@event)
    assert_response :success
  end

  # test "should update event" do
  #   patch event_url(@event), params: { event: { address: @event.address, age_category: @event.age_category, artist: @event.artist, code: @event.code, code: @event.code, description: @event.description, description: @event.description, festival: @event.festival, festival_id: @event.festival_id, genre: @event.genre, latitude: @event.latitude, longitude: @event.longitude, name: @event.name, phone: @event.phone, post_code: @event.post_code, status: @event.status, title: @event.title, updated: @event.updated, url: @event.url, venue: @event.venue, website: @event.website } }
  #   assert_redirected_to event_url(@event)
  # end

  test "should destroy event" do
    assert_difference('Event.count', -1) do
      delete event_url(@event)
    end
    assert_redirected_to events_url
  end
end
