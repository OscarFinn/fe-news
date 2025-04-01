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

export function getUser(username) {
  return apiClient
    .get(`/users/${username}`)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      return error;
    });
}

export function voteArticle(articleId, inc_votes) {
  console.log(inc_votes);
  return apiClient
    .patch(`articles/${articleId}`, { inc_votes })
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return error;
    });
}

export function voteComment(commentId, inc_votes) {
  console.log(inc_votes);
  return apiClient
    .patch(`comments/${commentId}`, { inc_votes })
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      return error;
    });
}
