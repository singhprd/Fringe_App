require "application_system_test_case"

class SessionsTest < ApplicationSystemTestCase
  test "login" do
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
    page.has_text?("Sign out")
  end

  test "logging in with helper" do
    sign_in(create(:user))
    has_current_path?('/')
    page.has_text?("Sign out")
  end
end
