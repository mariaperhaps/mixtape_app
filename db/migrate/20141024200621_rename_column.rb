class RenameColumn < ActiveRecord::Migration
  def change
    rename_column :tapes, :reciever, :receiver
  end
end
