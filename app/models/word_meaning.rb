class WordMeaning < ApplicationRecord
  belongs_to :word
  has_many :studied_words
end
