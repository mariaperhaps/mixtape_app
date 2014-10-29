class InvitationsController < ApplicationController




    def deliver
    Pony.mail({
      :to => "mariatschettino@gmail.com",
      :subject => "Check it Out",
      :body => "here is your link",
      :html_body => '<a href="https://mysterious-woodland-7075.herokuapp.com/tapes/2">website</a>',
      :via => :smtp,
      :via_options => {
        :address => 'smtp.gmail.com',
        :port => '587',
        :user_name => ENV['SENDGRID_USERNAME'],
        :password => ENV['SENDGRID_PASSWORD'],
        :authentication => :plain,
        :enable_starttls_auto => true
      }
    })
  end

end
