class Add < ActiveRecord::Migration
  def change
    add_column :tapes, :fill_primary, :string, :default => "url(#SVGID_10_)"
    add_column :tapes, :fill_secondary, :string, :default => "url(#SVGID_10_)"
  end
end
