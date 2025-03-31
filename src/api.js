import axios from "axios";

const api = "https://be-news-olwx.onrender.com/api";

export function getArticles() {
  let apiCall = `${api}/articles`;
  return axios.get(apiCall).then((response) => {
    return response.data.articles;
  });
}
