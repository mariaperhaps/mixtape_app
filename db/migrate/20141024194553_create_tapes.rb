class CreateTapes < ActiveRecord::Migration
  def change
    create_table :tapes do |t|
      t.string :name
      t.string :message
      t.string :reciever
      t.references :user_id, index: true

      t.timestamps
    end
  end
end
