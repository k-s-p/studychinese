class MultipleChoiceQuestionsController < ApplicationController
  def index
  end

  # テスト開始を押したときのアクション
  def Start

    # パラメータを取得
    study_level = params[:hsklevel].split(',') # hskのレベル
    study_limit = params[:question_num] # 問題数
    studied = params[:studied] # 学習済みかどうか

    # データ取得
    if studied === "1"
      words = Word.joins(word_meanings: :studied_words).select('word_meanings.id, word, pinyin, meaning, hsklevel').distinct.where(word_meanings: {hsklevel: study_level}, studied_words: {user_id: current_user.id}).order("RANDOM()").limit(study_limit)
    else
      words = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, hsklevel').where(word_meanings: {hsklevel: study_level}).order("RANDOM()").limit(study_limit)
    end
    meanings = WordMeaning.select('id, meaning').where(hsklevel: study_level)
    meanings_len = meanings.length

    #問題用ハッシュを作成
    problems = {}
    cnt = 0
    words.each do |word|
      num_set = Set.new
      # ランダムに問題の選択肢を取得（被ると困るので一つ余分に4つ取得しておく)
      while num_set.length < 4
        num_set.add(rand(meanings_len))
      end
      choices = [word.meaning]
      num_set.each do |num|
        if choices.length == 4
          break
        end
        if meanings[num].id != word.id
          choices.push(meanings[num].meaning)
        end
      end
      choices.shuffle! # 選択肢をランダムに入れ替える

      # 問題のハッシュを作成
      temp = {
        id: word.id,
        word: word.word,
        pinyin: word.pinyin,
        meaning: word.meaning,
        level: word.hsklevel,
        s1: choices[0],
        s2: choices[1],
        s3: choices[2],
        s4: choices[3]
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
