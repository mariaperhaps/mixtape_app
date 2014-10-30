class InvitationsController < ApplicationController

  def create
    tape = Tape.find(params[:id])
    receiver = tape.receiver
    message = tape.message
    id = tape.id
    tape_link = "https://mysterious-woodland-7075.herokuapp.com/tapes/#{id}"
    user = User.find(tape.user_id)
    sender = user.name
    deliver(sender, receiver, tape_link, message)
    render :json => id
  end

private

    def deliver(sender, receiver, tape_link, message)
    Pony.mail({
      :to => receiver,
      :subject => "#{sender} sent you a mixtape",
      :body => message,
      :html_body => "<a href=#{tape_link}>website</a>",
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

  #   def deliver(sender, receiver, tape_link, message)
  #   Pony.mail({
  #     :to => receiver,
  #     :subject => "#{sender} made you a mixtape!",
  #     :body => "#{message}",
  #     :html_body => "<a href=https://mysterious-woodland-7075.herokuapp.com/tapes/2></a>",
  #     :via => :smtp,
  #     :via_options => {
  #       :address => 'smtp.gmail.com',
  #       :port => '587',
  #       :user_name => ENV['SENDGRID_USERNAME'],
  #       :password => ENV['SENDGRID_PASSWORD'],
  #       :authentication => :plain,
  #       :enable_starttls_auto => true
  #     }
  #   })
  # end

end
