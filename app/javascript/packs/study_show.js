document.addEventListener('turbolinks:load', function(){
  document.querySelector('#study_back_button').addEventListener('click', redirect_index);
  document.querySelector('#study_next_button').addEventListener('click', redirect_next);
  document.querySelector('#study_previous_button').addEventListener('click', redirect_previous);
});

// 戻るボタンを押したときの処理
function redirect_index(){
  let searchParam = JSON.parse(localStorage.getItem("study_search_param")); // 検索条件をローカルストレージから取得
  let queryString = Object.keys(searchParam).map(key => {
    let value = Array.isArray(searchParam[key]) ? searchParam[key].join(",") : searchParam[key];
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }).join("&"); // 検索条件をURLパラメータにエンコード
  let url = "/study?" + queryString; // 遷移先のURLを作成
  location.href = url; // 作成したURLに遷移
};

// 次の単語ボタンを押したときの処理
function redirect_next(){
  let word_id = document.querySelector('#word_id').innerText; //単語id
  let searchParam = JSON.parse(localStorage.getItem("study_search_param")); // 検索条件をローカルストレージから取得
  let queryString = Object.keys(searchParam).map(key => {
    let value = Array.isArray(searchParam[key]) ? searchParam[key].join(",") : searchParam[key];
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }).join("&"); // 検索条件をURLパラメータにエンコード
  let url = "/study/next_word?" + queryString + '&word_id=' + word_id; // 遷移先のURLを作成
  location.href = url; // 作成したURLに遷移
};

// 前の単語ボタンを押したときの処理
function redirect_previous(){
  let word_id = document.querySelector('#word_id').innerText; //単語id
  let searchParam = JSON.parse(localStorage.getItem("study_search_param")); // 検索条件をローカルストレージから取得
  let queryString = Object.keys(searchParam).map(key => {
    let value = Array.isArray(searchParam[key]) ? searchParam[key].join(",") : searchParam[key];
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }).join("&"); // 検索条件をURLパラメータにエンコード
  let url = "/study/previous_word?" + queryString + '&word_id=' + word_id; // 遷移先のURLを作成
  location.href = url; // 作成したURLに遷移
};