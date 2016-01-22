require "rails_helper"
require 'pry'

feature 'Sign-Up' do

  scenario "A User can create an account" do
    visit "/users/new"
    fill_in "email", :with => "m@m.com"
    fill_in "name", :with => "Maria"
    fill_in "twitter", :with => "LeadObject"
    page.fill_in "city", :with => "Brooklyn"
    fill_in "password", :with => "1111"
    click_button("Signup")
    expect(page).to have_text("Your Tapes")
  end


  scenario "A user cannot signup without a unique email or password" do
    User.create({email: "m@m.com", password: "1111"})
    visit "/users/new"
    fill_in "email", :with => "m@m.com"
    click_button("Signup")
    expect(page).to have_text("Email has already been taken")
    expect(page).to have_text("Password can't be blank")
  end
end

feature "Login" do
  scenario "User needs a password to login" do
    visit "/login"


    fill_in "email", :with => "m@m.com"
    click_button "LOGIN"

    expect(page).to have_text("Incorrect username or password.")
  end

  scenario "A user can login with the proper credentials" do
    visit "/login"
    User.create({email: "m@m.com", password: "1111"})
    fill_in "email", :with => "m@m.com"
    fill_in "password", :with => "1111"
    click_button "LOGIN"
    expect(page).to have_text("Your Tapes")
  end


end
