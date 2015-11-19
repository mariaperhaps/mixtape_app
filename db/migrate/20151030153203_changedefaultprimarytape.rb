class Changedefaultprimarytape < ActiveRecord::Migration
  def change
    change_column :tapes, :fill_primary, :string, :default => "url(#SVGID_5_)"
  end
end
