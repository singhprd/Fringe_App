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

ActiveRecord::Schema.define(version: 20170719212410) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "age_category"
    t.string "artist"
    t.string "code"
    t.string "description"
    t.string "festival"
    t.string "festival_id"
    t.string "genre"
    t.string "latitude"
    t.string "longitude"
    t.string "status"
    t.string "title"
    t.string "updated"
    t.string "url"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "score", default: 0
    t.integer "venue_id"
    t.string "festival_year"
    t.string "last_checked_for_update"
    t.datetime "performances_last_updated"
    t.index ["venue_id"], name: "index_events_on_venue_id"
  end

  create_table "favourites", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_favourites_on_event_id"
    t.index ["user_id", "event_id"], name: "index_favourites_on_user_id_and_event_id", unique: true
    t.index ["user_id"], name: "index_favourites_on_user_id"
  end

  create_table "fringebots", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "image_versions", force: :cascade do |t|
    t.string "description"
    t.string "height"
    t.string "mime"
    t.string "image_type"
    t.string "url"
    t.string "width"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "image_id"
    t.index ["image_id"], name: "index_image_versions_on_image_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "image_hash"
    t.string "image_type"
    t.string "orientation"
    t.integer "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_images_on_event_id"
  end

  create_table "performances", force: :cascade do |t|
    t.string "concession"
    t.string "end_time"
    t.string "price"
    t.string "start_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "event_id"
    t.string "concession_additional"
    t.string "concession_family"
    t.string "title"
    t.index ["event_id"], name: "index_performances_on_event_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "url"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "event_id"
    t.index ["event_id"], name: "index_reviews_on_event_id"
  end

  create_table "searches", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "votes_left", default: 100
    t.integer "vote_reset_amount", default: 10
    t.string "username"
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "venues", force: :cascade do |t|
    t.string "address"
    t.boolean "box_office_fringe"
    t.string "box_office_opening"
    t.string "cafe_description"
    t.string "code"
    t.string "email"
    t.string "fax"
    t.boolean "has_bar"
    t.boolean "has_booking_over_card"
    t.boolean "has_booking_over_phone"
    t.boolean "has_booking_over_web"
    t.boolean "has_cafe"
    t.string "name"
    t.string "phone"
    t.string "lat"
    t.string "lon"
    t.string "post_code"
    t.string "web_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "position"
    t.string "description"
    t.string "disabled_description"
  end

  create_table "votes", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_votes_on_event_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "events", "venues"
  add_foreign_key "favourites", "events"
  add_foreign_key "favourites", "users"
  add_foreign_key "image_versions", "images"
  add_foreign_key "images", "events"
  add_foreign_key "performances", "events"
  add_foreign_key "reviews", "events"
  add_foreign_key "votes", "events"
  add_foreign_key "votes", "users"
end
