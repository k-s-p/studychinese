document.addEventListener('turbolinks:load', function(){
  document.querySelector('#study_back_button').addEventListener('click', redirect_index);
});

function redirect_index(){
  let searchParam = JSON.parse(localStorage.getItem("study_search_param")); // 検索条件をローカルストレージから取得
  let queryString = Object.keys(searchParam).map(key => {
    let value = Array.isArray(searchParam[key]) ? searchParam[key].join(",") : searchParam[key];
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }).join("&"); // 検索条件をURLパラメータにエンコード
  let url = "/study?" + queryString; // 遷移先のURLを作成
  location.href = url; // 作成したURLに遷移
};