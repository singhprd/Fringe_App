require 'test_helper'

class VenueTest < ActiveSupport::TestCase
  test "venue_one" do
    assert_equal 1, Venue.count
  end

  test "venue_one_has_cafe" do
    assert_equal true, Venue.first.has_cafe
  end

end
