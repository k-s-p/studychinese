// studyform = document.querySelector('form[action="/study"]');

document.addEventListener('turbolinks:load', function(){
  document.querySelectorAll('.study_button').forEach(function(a){
    a.addEventListener('click', set_localstorage);
  });
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