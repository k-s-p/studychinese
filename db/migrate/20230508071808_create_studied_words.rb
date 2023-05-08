class CreateStudiedWords < ActiveRecord::Migration[6.0]
  def change
    create_table :studied_words do |t|
      t.references :user, null: false, foreign_key: true
      t.references :word_meaning, null: false, foreign_key: true
      t.string :example

      t.timestamps
    end
  end
end
