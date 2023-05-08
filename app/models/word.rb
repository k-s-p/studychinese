class Word < ApplicationRecord
  has_many :word_meanings
  has_many :studied_words
end
