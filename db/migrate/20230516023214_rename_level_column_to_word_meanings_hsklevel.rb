class RenameLevelColumnToWordMeaningsHsklevel < ActiveRecord::Migration[6.0]
  def change
    rename_column :word_meanings, :level, :hsklevel
  end
end
