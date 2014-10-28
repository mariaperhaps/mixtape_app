class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name
      t.string :artist
      t.integer :duration
      t.integer :soundcloud_id
      t.references :tape_id, index: true

      t.timestamps
    end
  end
end
