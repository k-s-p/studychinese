questions = {};
now_question = 0;

document.addEventListener('turbolinks:load', function(){
  document.querySelector('#startbutton').addEventListener('click', get_questions);
  document.querySelector('#nextbutton').addEventListener('click', next_question);
});

// ajax通信で問題のJSONを取得し、画面を書き換える
function get_questions(){
  now_question = 0;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/multiplechoicequestions/start');
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if(this.readyState === 4) {  //データ取得後の処理内容 
      questions = xhr.response;
      document.querySelector('#pinyin_field').innerText = questions[now_question].pinyin;
      document.querySelector('#word_field').innerText = questions[now_question].word;
      document.querySelector('#choice1').innerText = questions[now_question].s1;
      document.querySelector('#choice2').innerText = questions[now_question].s2;
      document.querySelector('#choice3').innerText = questions[now_question].s3;
      document.querySelector('#choice4').innerText = questions[now_question].s4;
      now_question += 1;
    };
  };
  xhr.send();
};

// 次へボタンで次の問題を表示する
function next_question(){
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