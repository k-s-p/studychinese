class StudyController < ApplicationController
  def index
    @words = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, level')
  end

  def show
    @word = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, level').find_by(word_meanings: {id: params[:id]})
    @examples = WordMeaning.left_joins(:studied_words).select("studied_words.id, studied_words.example").where(studied_words: {user_id: current_user.id}, id: params[:id])
  end

  def create_or_update
    if params[:id1]
      example = StudiedWord.find(params[:id1])
      example.update(example: example_params[:example1])
      example = StudiedWord.find(params[:id2])
      example.update(example: example_params[:example2])
      flash[:notice] = "更新しました"
      redirect_to study_path(params[:WordMeaning_id])
    else
      example = StudiedWord.new(user_id: current_user.id, word_meaning_id: example_params[:WordMeaning_id], example: example_params[:example1])
      example.save
      example = StudiedWord.new(user_id: current_user.id, word_meaning_id: example_params[:WordMeaning_id], example: example_params[:example2])
      example.save
      flash[:notice] = "保存しました"
      redirect_to study_path(params[:WordMeaning_id])
    end
  end

  private

  def example_params
    params.permit(:WordMeaning_id, :id1, :example1, :id2, :example2)
  end

end
