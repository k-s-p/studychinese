// studyform = document.querySelector('form[action="/study"]');

document.addEventListener('turbolinks:load', function(){
  document.querySelectorAll('.study_button').forEach(function(a){
    a.addEventListener('click', set_localstorage);
  });
  document.querySelector("#Study_searchbutton").addEventListener('click', hsklevel_check)
});

// 学習ボタンを押したら、その時のページと検索条件をローカルストレージに保存しておく
function set_localstorage(){
  const hsklevels = document.querySelectorAll('input[name="hsklevel[]"]:checked'); // hskレベル選択のチェックボックス
  const studied = document.querySelector('input[name="studied"]:checked'); //学習済みチェックボックス
  const now_page_elem = document.querySelector('#now_page'); //現在のページ番号

  const keyword = {
    hsklevel: Array.from(hsklevels).map(hsklevel => hsklevel.value),
    studied: Boolean(studied),
    page: now_page_elem.innerText
  };
  // jsonで保存
  localStorage.setItem("study_search_param", JSON.stringify(keyword));
};

// hskレベルがチェックされてるか確認
function hsklevel_check(){
  const hsk_checkbox = document.querySelectorAll('input[name="hsklevel[]"]:checked');

  // チェックされたチェックボックスの値を格納する配列を初期化
  var checkedValues = [];
  // チェックされたチェックボックスの値を配列に追加
  for (var i = 0; i < hsk_checkbox.length; i++) {
    if (hsk_checkbox[i].checked) {
      checkedValues.push(hsk_checkbox[i].value);
    }
  }

  if(checkedValues.length>0){
    // 選択された値をパラメーターに変換
    var params = '?' + checkedValues.map(function(val) {
      return 'hsklevel[]=' + encodeURIComponent(val);
    }).join('&');
    // ページに遷移
    window.location.href = '/study' + params;
  }else{
    window.alert("hskレベルを選択してください。");
  }
};