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

ActiveRecord::Schema.define(version: 20161204132550) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string   "age_category"
    t.string   "artist"
    t.string   "code"
    t.string   "description"
    t.string   "festival"
    t.string   "festival_id"
    t.string   "genre"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "status"
    t.string   "title"
    t.string   "updated"
    t.string   "url"
    t.string   "venue"
    t.string   "address"
    t.string   "name"
    t.string   "phone"
    t.string   "post_code"
    t.string   "website"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "score",        default: 0
    t.integer  "venue_id"
    t.index ["venue_id"], name: "index_events_on_venue_id", using: :btree
  end

  create_table "fringebots", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "performances", force: :cascade do |t|
    t.string   "concession"
    t.datetime "end"
    t.string   "price"
    t.datetime "start"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "event_id"
    t.index ["event_id"], name: "index_performances_on_event_id", using: :btree
  end

  create_table "reviews", force: :cascade do |t|
    t.string   "url"
    t.string   "stars"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "event_id"
    t.index ["event_id"], name: "index_reviews_on_event_id", using: :btree
  end

  create_table "searches", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "votes_left",             default: 10
    t.integer  "vote_reset_amount",      default: 10
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "venues", force: :cascade do |t|
    t.string   "address"
    t.boolean  "box_office_fringe"
    t.string   "box_office_opening"
    t.string   "cafe_description"
    t.string   "code"
    t.string   "email"
    t.string   "fax"
    t.boolean  "has_bar"
    t.boolean  "has_booking_over_card"
    t.boolean  "has_booking_over_phone"
    t.boolean  "has_booking_over_web"
    t.boolean  "has_cafe"
    t.string   "name"
    t.string   "phone"
    t.string   "lat"
    t.string   "lon"
    t.string   "post_code"
    t.string   "web_address"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "votes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.integer  "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_votes_on_event_id", using: :btree
    t.index ["user_id"], name: "index_votes_on_user_id", using: :btree
  end

  add_foreign_key "events", "venues"
  add_foreign_key "performances", "events"
  add_foreign_key "reviews", "events"
  add_foreign_key "votes", "events"
  add_foreign_key "votes", "users"
end
