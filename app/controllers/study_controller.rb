class StudyController < ApplicationController
  def index
    @words = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, level')
  end

  def show
    @word = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, level').find_by(word_meanings: {id: params[:id]})
    @examples = WordMeaning.left_joins(:studied_words).select("studied_words.id, studied_words.example").where(studied_words: {user_id: current_user.id})
  end

end
