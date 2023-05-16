questions = {};
now_question = 0;

document.addEventListener('turbolinks:load', function(){
  document.querySelector('#fb_startbutton').addEventListener('click', get_questions);
  document.querySelector('#fb_nextbutton').addEventListener('click', next_question);
  
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
  let question_num_radio = document.getElementsByName('radio1'); //問題数の指定
  question_num_radio.forEach(radio => {
    if(radio.checked === true){
      searchParams.append('question_num', radio.value);
    };
  });  
  // リクエストを送信
  fetch('/fillintheblankquestions/start?' + searchParams.toString())
    .then(response => response.json())
    .then(data => {
      questions = data;
      if(Object.keys(questions).length){
        document.querySelector('#blank_example').innerText = questions[now_question].sentence;
        document.getElementById("fb_question-params").style.display = 'none'
        document.getElementById("fb_question").style.display = 'block' // 問題を表示
      }else{
        window.alert("問題がありません。出題条件を変更してください。")
      }
    })
    .catch(error => console.log(error.message)); //エラー発生時の処理が必要
}

// 次へボタンで正誤判定と次の問題を表示する
function next_question(){

  check_answer();

  if(now_question < Object.keys(questions).length-1){
    now_question += 1;
    document.querySelector('#blank_example').innerText = questions[now_question].sentence;
  }else{
    document.getElementById("fb_question").style.display = 'none' //問題を隠す
    document.getElementById("fb_question-end").style.display = 'block' //回答結果を表示
  }
};

// 正誤判定を行って、結果行に追加する
function check_answer(){
  let answer = document.getElementById("fill_blank");
  let word = questions[now_question].word;
  if(answer.value != word){
    answer_add("×"); //回答結果をテーブルに追加
  }else{
    answer_add("〇"); //回答結果をテーブルに追加
  }

  // 回答を消去
  answer.value = ""
};


//行追加する関数
function answer_add(judge){
  const answer_tb = document.getElementById('fb_answer-table');

  //空の行要素を先に作成
  let tr = document.createElement("tr"); 

  // trに追加する要素を作成
  let td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.textContent = "問題"+(now_question+1)
  td.rowSpan = "2"
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

  //完成したtrをtableに追加
  answer_tb.appendChild(tr);  

  tr = document.createElement("tr"); 
  td = document.createElement("td");      //新しいtd要素を作って変数tdに格納
  td.colSpan = "4"
  td.textContent = questions[now_question].example;
  if(judge == "〇"){
    td.style.color = "green"
  }else{
    td.style.color = "red"
  }
  tr.appendChild(td);
  answer_tb.appendChild(tr);
};