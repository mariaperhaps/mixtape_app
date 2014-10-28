class AddColorTapes < ActiveRecord::Migration
  def change
    add_column :tapes, :color, :string
  end
end
