require "application_system_test_case"

class EventsTest < ApplicationSystemTestCase
  test "visiting the search form and verify results" do
    visit "/"
    click_on('Sign in')
    
    click_on('Sign up')
    fill_in('Email', :with => 'test@test.com')
    fill_in('Username', :with => 'test username')
    
    fill_in('Password', :with => 'password')
    fill_in('Password confirmation', :with => 'password')
    
    click_button("Sign up")
    
    click_on("Account")
    click_on("Sign out")

    click_on("Sign in")
    fill_in('Email', :with => 'test@test.com')
    fill_in('Password', :with => 'password')

    click_button("Log in")

    has_current_path?('/')

    visit "/searches/new"
    assert_selector "#search-panel", text: "Search"
    select("2016", :from => "Year")
    select("Edinburgh's Hogmanay", :from => "Festival")
    click_button('Search')
    
    page.has_selector?('home_card', count: 5)
    click_on("Concert in the Gardens")
    
    click_on("❤️️")
    
    page.has_selector?('home_card', count: 1)
    assert_selector "a", text: "Concert in the Gardens"

    click_on("🗓️")
    page.has_table?('performances_for_event24')
    
    page.assert_selector('td', :text => 'Saturday 31st December 2016', :visible => true)
    page.assert_selector('td', :text => '20:00', :visible => true)
    page.assert_selector('td', :text => '01:00', :visible => true)
    
    click_on("🗓️")
    page.has_no_table?('performances_for_event24')

    page.assert_selector('button', :text => '0', :visible => true)
    click_on("👍")
    click_on("👍")
    click_on("👍")
    page.assert_selector('button', :text => '3', :visible => true)


    # click_on("Home")
    # click_button("Favourite")
    
    # click_button("2016")
    
    # navigate().refresh();

    # page.has_selector?('home_card', count: 1)
    # assert_selector "a", text: "Concert in the Gardens"

    # click_link("🗓️")
    # assert_selector "#performances_for_event183"
  end
end
