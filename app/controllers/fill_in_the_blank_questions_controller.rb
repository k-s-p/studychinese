class FillInTheBlankQuestionsController < ApplicationController
  def index
  end

  # テスト開始を押したときのアクション
  def Start

    # パラメータを取得
    study_level = params[:hsklevel].split(',') # hskのレベル
    study_limit = params[:question_num] # 問題数

    # 指定したhskレベルのデータを全部取得して、ちゃんと単語が含まれている例文だけを問題として扱う
    words = Word.joins(word_meanings: :studied_words).select('word_meanings.id, word, pinyin, meaning, hsklevel, example').where(word_meanings: {hsklevel: study_level}, studied_words: {user_id: current_user.id}).order("RANDOM()")

    #問題用ハッシュを作成
    problems = {}
    cnt = 0
    words.each do |word|
      target_word = word.word
      if cnt >= study_limit.to_i # 問題数分の問題が作成できたら終了
        break
      end

      # 例文にその単語が含まれていないなら次の例文を確認する
      unless word.example.include?(target_word) 
        next
      end
      
      # 例文の単語部分を"_"で置き換える処理
      replacement = "_" * target_word.length
      result = word.example.gsub(/#{target_word}/, replacement)

      # 問題のハッシュを作成
      temp = {
        id: word.id,
        word: word.word,
        pinyin: word.pinyin,
        meaning: word.meaning,
        level: word.hsklevel,
        example: word.example,
        sentence: result
      }

      problems[cnt] = temp
      cnt += 1
    end

    # 問題データをJSONで返信する
    respond_to do |format|
      format.json { render json: problems.to_json }
    end

  end

end
