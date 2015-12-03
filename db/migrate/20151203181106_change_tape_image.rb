class ChangeTapeImage < ActiveRecord::Migration
  def change
    change_column :tapes, :img_url, :string, :default => "white_tape.svg"
  end
end
