class ChangeTapeColumn < ActiveRecord::Migration
  def change
    rename_column :tapes, :color, :img_url
  end
end
