import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://be-news-olwx.onrender.com/api",
});

export function getArticles() {
  return apiClient
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      return error;
    });
}

export function getArticle(id) {
  return apiClient
    .get(`/articles/${id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return error;
    });
}

export function getArticleComments(id) {
  return apiClient
    .get(`/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      return error;
    });
}
