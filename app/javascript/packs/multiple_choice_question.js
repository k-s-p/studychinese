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
  searchParams.append('hsklevel', hsklevels);
  let studied_checkbox = document.getElementById("chk-studied"); //学習済み問題か
  if(studied_checkbox.checked){
    searchParams.append('studied', '1');
  }else{
    searchParams.append('studied', '0');
  };
  let question_num_radio = document.getElementsByName('radio1'); //問題数の指定
  question_num_radio.forEach(radio => {
    if(radio.checked === true){
      searchParams.append('question_num', radio.value);
    };
  });  
  // リクエストを送信
  fetch('/multiplechoicequestions/start?' + searchParams.toString())
    .then(response => response.json())
    .then(data => {
      questions = data;
      if(Object.keys(questions).length){
        document.querySelector('#pinyin').innerText = questions[now_question].pinyin;
        document.querySelector('#word').innerText = questions[now_question].word;
        document.querySelector('#choice1').innerText = questions[now_question].s1;
        document.querySelector('#choice2').innerText = questions[now_question].s2;
        document.querySelector('#choice3').innerText = questions[now_question].s3;
        document.querySelector('#choice4').innerText = questions[now_question].s4;
        document.getElementById("question-params").style.display = 'none'
        document.getElementById("question").style.display = 'block' // 問題を表示
      }else{
        window.alert("問題がありません。出題条件を変更してください。")
      }
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

  if(now_question < Object.keys(questions).length){
    now_question += 1;
    document.querySelector('#pinyin').innerText = questions[now_question].pinyin;
    document.querySelector('#word').innerText = questions[now_question].word;
    document.querySelector('#choice1').innerText = questions[now_question].s1;
    document.querySelector('#choice2').innerText = questions[now_question].s2;
    document.querySelector('#choice3').innerText = questions[now_question].s3;
    document.querySelector('#choice4').innerText = questions[now_question].s4;
    document.getElementById("question-next").style.display = 'none'
  };
};

// 選択肢を選んだ時に正誤判定を行う
// 選んだ選択肢が正解なら緑、不正解なら赤にして、正解の選択肢を緑にする
function check_answer(event){
  let obj = event.target;
  let choices = document.querySelectorAll('.choice-button');
  choices.forEach(choice => {
    choice.disabled = true;
    if(choice.innerText === questions[now_question].meaning){
      choice.classList.toggle("btn-outline-dark");
      choice.classList.toggle("btn-success");
    };
  });
  if(obj.innerText != questions[now_question].meaning){
    obj.classList.toggle("btn-outline-dark");
    obj.classList.toggle("btn-danger");
    answer_add("×"); //回答結果をテーブルに追加
  }else{
    answer_add("〇"); //回答結果をテーブルに追加
  }
  
  if(now_question < Object.keys(questions).length-1){
    document.getElementById("question-next").style.display = 'block'
  }else{
    document.getElementById("question").style.display = 'none' //問題を隠す
    document.getElementById("question-end").style.display = 'block' //回答結果を表示
  }
};


//行追加する関数
function answer_add(judge){
  const answer_tb = document.getElementById('answer-table');

  //空の行要素を先に作成
  let tr = document.createElement("tr"); 

  // trに追加する要素を作成
  let td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.textContent = "問題"+(now_question+1)
  tr.appendChild(td);         //trにtdを追加
  
  td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.textContent = questions[now_question].pinyin
  tr.appendChild(td);         //trにtdを追加

  td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.textContent = questions[now_question].word
  tr.appendChild(td);         //trにtdを追加

  td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.textContent = questions[now_question].meaning
  tr.appendChild(td);         //trにtdを追加

  td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.textContent = judge
  tr.appendChild(td);         //trにtdを追加

  if(judge == "〇"){
    tr.style.color = "green"
  }else{
    tr.style.color = "red"
  }

  //完成したtrをtableに追加
  answer_tb.appendChild(tr);  
};