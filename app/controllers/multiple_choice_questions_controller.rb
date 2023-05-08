class MultipleChoiceQuestionsController < ApplicationController
  def Index
  end

  # テスト開始を押したときのアクション
  def Start

    # パラメータを取得
    study_level = params[:hsklevel].split(',') # hskのレベル
    study_limit = params[:question_num] # 問題数
    studied = params[:studied] # 学習済みかどうか

    # データ取得
    words = Word.joins(:word_meanings).select('word_meanings.id, word, pinyin, meaning, level').where(word_meanings: {level: study_level}).order("RAND()").limit(study_limit)
    meanings = WordMeaning.select('id, meaning').where(level: study_level)
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

      # 問題のハッシュを作成
      temp = {
        id: word.id,
        word: word.word,
        pinyin: word.pinyin,
        meaning: word.meaning,
        level: word.level,
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
