class ChangeTape < ActiveRecord::Migration
  def change
    rename_column :tapes, :user_id_id, :user_id
  end
end
