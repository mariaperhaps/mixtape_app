class Defaulttapeimagesvg < ActiveRecord::Migration
  def change
    change_column :tapes, :img_url, :string, :default => "/assets/white_tape.svg"
  end


end
