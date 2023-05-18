class StudyController < ApplicationController
  def index
    # 検索条件を取得
    hskleveles = params[:hsklevel] ? params[:hsklevel] : "1"
    studied = params[:studied] ? params[:studied] : "0"
    # byebug
    # 学習済み単語のみ検索の場合は、inner joinでつなぐ
    if studied == "1"
      @words = WordMeaning.select("word_meanings.id, words.word AS tango, words.pinyin AS pinyin, word_meanings.meaning, word_meanings.hsklevel, A.word_meaning_id")
      .joins(:word)
      .joins("
                INNER JOIN (
                  SELECT studied_words.word_meaning_id, studied_words.user_id
                  FROM studied_words
                  GROUP BY studied_words.word_meaning_id, studied_words.user_id
                ) AS A 
                ON A.word_meaning_id = word_meanings.id
                AND A.user_id = #{current_user.id}
              ")
      .where(word_meanings: {hsklevel: hskleveles})
      .order(:hsklevel, :pinyin)
      .page(params[:page])
    else
      # 学習済み単語のみじゃない場合は、left joinでつなぐ
      @words = WordMeaning.select("word_meanings.id, words.word AS tango, words.pinyin AS pinyin, word_meanings.meaning, word_meanings.hsklevel, A.word_meaning_id")
      .joins(:word)
      .joins("
                LEFT JOIN (
                  SELECT studied_words.word_meaning_id, studied_words.user_id
                  FROM studied_words
                  GROUP BY studied_words.word_meaning_id, studied_words.user_id
                ) AS A 
                ON A.word_meaning_id = word_meanings.id
                AND A.user_id = #{current_user.id}
              ")
      .where(word_meanings: {hsklevel: hskleveles})
      .order(:hsklevel, :pinyin)
      .page(params[:page])
    end
  end

  # 単語の詳細ページを表示
  def show
    @word = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, hsklevel').find_by(word_meanings: {id: params[:id]})
    @examples = WordMeaning.left_joins(:studied_words).select("studied_words.id, studied_words.example").where(studied_words: {user_id: current_user.id}, id: params[:id])
  end

  # 単語に例文を登録する処理
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

  # 単語詳細で次の単語ボタンを押したときの処理
  def next_word
    # 検索条件を取得
    hskleveles = params[:hsklevel] ? params[:hsklevel] : "1"
    studied = params[:studied] ? params[:studied] : "0"

    # 学習済み単語のみ検索の場合は、inner joinでつなぐ
    if studied == "1"
      @word = WordMeaning.select("word_meanings.id, words.word AS tango, words.pinyin AS pinyin, word_meanings.meaning, word_meanings.hsklevel, A.word_meaning_id")
      .joins(:word)
      .joins("
                INNER JOIN (
                  SELECT studied_words.word_meaning_id, studied_words.user_id
                  FROM studied_words
                  GROUP BY studied_words.word_meaning_id, studied_words.user_id
                ) AS A 
                ON A.word_meaning_id = word_meanings.id
                AND A.user_id = #{current_user.id}
              ")
      .where(word_meanings: {hsklevel: hskleveles, id: (params[:word_id].to_i+1)..})
      .order(:hsklevel, :pinyin)
      .first
    else
      # 学習済み単語のみじゃない場合は、left joinでつなぐ
      @word = WordMeaning.select("word_meanings.id, words.word AS tango, words.pinyin AS pinyin, word_meanings.meaning, word_meanings.hsklevel, A.word_meaning_id")
      .joins(:word)
      .joins("
                LEFT JOIN (
                  SELECT studied_words.word_meaning_id, studied_words.user_id
                  FROM studied_words
                  GROUP BY studied_words.word_meaning_id, studied_words.user_id
                ) AS A 
                ON A.word_meaning_id = word_meanings.id
                AND A.user_id = #{current_user.id}
              ")
      .where(word_meanings: {hsklevel: hskleveles, id: (params[:word_id].to_i+1)..})
      .order(:hsklevel, :pinyin)
      .first
    end

    if @word
      redirect_to study_path(@word.id)
    else
      redirect_to study_path(params[:word_id])
    end
  end

    # 単語詳細で前の単語ボタンを押したときの処理
    def previous_word
      # 検索条件を取得
      hskleveles = params[:hsklevel] ? params[:hsklevel] : "1"
      studied = params[:studied] ? params[:studied] : "0"
  
      # 学習済み単語のみ検索の場合は、inner joinでつなぐ
      if studied == "1"
        @word = WordMeaning.select("word_meanings.id, words.word AS tango, words.pinyin AS pinyin, word_meanings.meaning, word_meanings.hsklevel, A.word_meaning_id")
        .joins(:word)
        .joins("
                  INNER JOIN (
                    SELECT studied_words.word_meaning_id, studied_words.user_id
                    FROM studied_words
                    GROUP BY studied_words.word_meaning_id, studied_words.user_id
                  ) AS A 
                  ON A.word_meaning_id = word_meanings.id
                  AND A.user_id = #{current_user.id}
                ")
        .where(word_meanings: {hsklevel: hskleveles, id: ...params[:word_id].to_i})
        .order(:hsklevel, :pinyin)
        .last
      else
        # 学習済み単語のみじゃない場合は、left joinでつなぐ
        @word = WordMeaning.select("word_meanings.id, words.word AS tango, words.pinyin AS pinyin, word_meanings.meaning, word_meanings.hsklevel, A.word_meaning_id")
        .joins(:word)
        .joins("
                  LEFT JOIN (
                    SELECT studied_words.word_meaning_id, studied_words.user_id
                    FROM studied_words
                    GROUP BY studied_words.word_meaning_id, studied_words.user_id
                  ) AS A 
                  ON A.word_meaning_id = word_meanings.id
                  AND A.user_id = #{current_user.id}
                ")
        .where(word_meanings: {hsklevel: hskleveles, id: ...params[:word_id].to_i})
        .order(:hsklevel, :pinyin)
        .last
      end
  
      if @word
        redirect_to study_path(@word.id)
      else
        redirect_to study_path(params[:word_id])
      end
    end

  private

  def example_params
    params.permit(:WordMeaning_id, :id1, :example1, :id2, :example2)
  end

end
