class Change < ActiveRecord::Migration
  def change
    change_column :users, :avatar, :string, :default => "default-avatar.png"
  end


end

