class AddInfoToUser < ActiveRecord::Migration
  def change
    add_column :users, :city, :string
    add_column :users, :twitter, :string
    add_column :users, :avatar, :string, :default => "/assets/default-avatar.png"
  end
end
