describe User do
  let(:user) {User.create(email:'m@m.com', password:"1111")}
  let (:user_2) {User.create(email:'m@m.com')}

  it "should be invalid without a unique email" do
    expect(user_2.valid?).to be(false)
  end

  it "should be invalid without a password" do
    expect(user_2.valid?).to be(false)
    expect(user_2.errors.messages[:password][0]).to eq("can't be blank")
  end


end
