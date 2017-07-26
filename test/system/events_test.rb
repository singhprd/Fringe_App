require "application_system_test_case"

class EventsTest < ApplicationSystemTestCase
  test "visiting the search form and verify results" do
    visit "/search"
    assert_selector "#search-panel", text: "Search"
    select("2016", :from => "Year")
    select("Edinburgh's Hogmanay", :from => "Festival")
    click_button('Search')
    
    page.has_selector?('home_card', count: 5)
    click_link("Concert in the Gardens")
    
    page.has_selector?('home_card', count: 1)
    assert_selector "a", text: "Concert in the Gardens"

    # click_link("🗓️")
    # assert_selector "#performances_for_event183"
  end
end
