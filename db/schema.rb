# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151030153203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "songs", force: true do |t|
    t.string   "name"
    t.string   "artist"
    t.integer  "duration"
    t.integer  "soundcloud_id"
    t.integer  "tape_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "songs", ["tape_id"], name: "index_songs_on_tape_id", using: :btree

  create_table "tapes", force: true do |t|
    t.string   "name"
    t.string   "message"
    t.string   "receiver"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "img_url",        default: "/assets/white_tape.svg"
    t.string   "fill_primary",   default: "url(#SVGID_5_)"
    t.string   "fill_secondary", default: "#A7A9AC"
  end

  add_index "tapes", ["user_id"], name: "index_tapes_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "city"
    t.string   "twitter"
    t.string   "avatar",          default: "/assets/default-avatar.png"
  end

end
