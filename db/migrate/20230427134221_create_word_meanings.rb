class CreateWordMeanings < ActiveRecord::Migration[6.0]
  def change
    create_table :word_meanings do |t|
      t.string :meaning, null: false
      t.integer :level, null: false
      t.references :word, null: false, foreign_key: true

      t.timestamps
    end
  end
end
