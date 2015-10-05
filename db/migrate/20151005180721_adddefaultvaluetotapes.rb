class Adddefaultvaluetotapes < ActiveRecord::Migration
  def change
    change_column :tapes, :img_url, :string, :default => "/assets/white_tape.png"
  end
end
