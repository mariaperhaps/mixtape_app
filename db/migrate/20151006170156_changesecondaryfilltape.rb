class Changesecondaryfilltape < ActiveRecord::Migration
  def change
    change_column :tapes, :fill_secondary, :string, :default => "#A7A9AC"
  end
end
