class ChangeSong < ActiveRecord::Migration
  def change
    rename_column :songs, :tape_id_id, :tape_id
  end
end
