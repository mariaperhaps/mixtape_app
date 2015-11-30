class User < ActiveRecord::Base
  has_secure_password
  has_many :tapes
  validates :email, uniqueness: true
end
