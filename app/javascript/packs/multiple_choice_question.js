questions = {};
now_question = 0;

document.addEventListener('turbolinks:load', function(){
  document.querySelector('#startbutton').addEventListener('click', get_questions);
  document.querySelector('#nextbutton').addEventListener('click', next_question);

  document.querySelectorAll('.choice-button').forEach(function(a){
    a.addEventListener('click', check_answer);
  })
});

// ajax通信で問題のJSONを取得し、画面を書き換える
function get_questions() {
  now_question = 0;

  // 問題選択用パラメータを作成
  const searchParams = new URLSearchParams();
  let hsk_checkbox = document.querySelectorAll('.hsklevel'); //hskレベルを指定
  hsklevels = [];
  hsk_checkbox.forEach(checkbox => {
    if(checkbox.checked === true){
      hsklevels.push(checkbox.value);
    };
  });
  for (let item of hsklevels) {
    searchParams.append('hsklevel', item);
  };
  let studied_checkbox = document.getElementById("chk-studied"); //学習済み問題か
  if(studied_checkbox.checked){
    searchParams.append('studied', '1');
  }else{
    searchParams.append('studied', '0');
  };
  let question_num_radio = document.getElementsByName('radio1'); //問題数の指定
  question_num_radio.forEach(radio => {
    if(radio.checked === true){
      searchParams.append('studied', radio.value);
    };
  });

  // リクエストを送信
  fetch('/multiplechoicequestions/start?' + searchParams.toString())
    .then(response => response.json())
    .then(data => {
      questions = data;
      document.querySelector('#pinyin_field').innerText = questions[now_question].pinyin;
      document.querySelector('#word_field').innerText = questions[now_question].word;
      document.querySelector('#choice1').innerText = questions[now_question].s1;
      document.querySelector('#choice2').innerText = questions[now_question].s2;
      document.querySelector('#choice3').innerText = questions[now_question].s3;
      document.querySelector('#choice4').innerText = questions[now_question].s4;
      now_question += 1;
    })
    .catch(error => console.log(error.message)); //エラー発生時の処理が必要
}

// 次へボタンで次の問題を表示する
function next_question(){
  // ボタンの色の初期化
  let choices = document.querySelectorAll('.choice-button');
  choices.forEach(choice => {
    choice.disabled = false;
    if(choice.classList.contains("btn-success")){
      choice.classList.toggle("btn-success");
      choice.classList.toggle("btn-outline-dark");
    }else if(choice.classList.contains("btn-danger")){
      choice.classList.toggle("btn-danger");
      choice.classList.toggle("btn-outline-dark");
    };
  });

  if(now_question != Object.keys(questions).length){
    document.querySelector('#pinyin_field').innerText = questions[now_question].pinyin;
    document.querySelector('#word_field').innerText = questions[now_question].word;
    document.querySelector('#choice1').innerText = questions[now_question].s1;
    document.querySelector('#choice2').innerText = questions[now_question].s2;
    document.querySelector('#choice3').innerText = questions[now_question].s3;
    document.querySelector('#choice4').innerText = questions[now_question].s4;
    now_question += 1;
  }else{

  };
};

// 選択肢を選んだ時に正誤判定を行う
// 選んだ選択肢が正解なら緑、不正解なら赤にして、正解の選択肢を緑にする
function check_answer(event){
  let obj = event.target;
  let choices = document.querySelectorAll('.choice-button');
  choices.forEach(choice => {
    choice.disabled = true;
    if(choice.innerText === questions[now_question-1].meaning){
      choice.classList.toggle("btn-outline-dark");
      choice.classList.toggle("btn-success");
    };
  });
  if(obj.innerText != questions[now_question-1].meaning){
    obj.classList.toggle("btn-outline-dark");
    obj.classList.toggle("btn-danger");
  };
};