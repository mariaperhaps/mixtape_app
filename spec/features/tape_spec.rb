require "rails_helper"


require "rails_helper"

feature "Tape" do
  scenario "User creates a new tape" do
    visit "/login"

    fill_in "email", :with => "m@m.com"
    click_button "Login"

    expect(page).to have_text("Incorrect username or password.")
  end
end
