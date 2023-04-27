class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :word, null: false
      t.string :pinyin, null: false

      t.timestamps
    end
  end
end
