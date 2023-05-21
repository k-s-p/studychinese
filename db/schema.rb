# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_05_16_023214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "studied_words", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "word_meaning_id", null: false
    t.string "example"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_studied_words_on_user_id"
    t.index ["word_meaning_id"], name: "index_studied_words_on_word_meaning_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "word_meanings", force: :cascade do |t|
    t.string "meaning", null: false
    t.integer "hsklevel", null: false
    t.bigint "word_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["word_id"], name: "index_word_meanings_on_word_id"
  end

  create_table "words", force: :cascade do |t|
    t.string "word", null: false
    t.string "pinyin", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "studied_words", "users"
  add_foreign_key "studied_words", "word_meanings"
  add_foreign_key "word_meanings", "words"
end
