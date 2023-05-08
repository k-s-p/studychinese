class StudiedWord < ApplicationRecord
  belongs_to :user
  belongs_to :word_meaning
end
