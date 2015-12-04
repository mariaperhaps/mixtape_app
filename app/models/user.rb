class User < ActiveRecord::Base
  has_attached_file :avatar,  default_url: "default-avatar.png"
  has_secure_password
  has_many :tapes
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates :email, uniqueness: true
end
