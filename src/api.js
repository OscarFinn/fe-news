import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://be-news-olwx.onrender.com/api",
});

export function getArticles() {
  return apiClient.get("/articles").then((response) => {
    return response.data.articles;
  });
}

export function getArticle(id) {
  return apiClient.get(`/articles/${id}`).then((response) => {
    return response.data.article;
  });
}

export function getArticleComments(id) {
  return apiClient.get(`/articles/${id}/comments`).then((response) => {
    return response.data.comments;
  });
}

export function getUser(username) {
  return apiClient.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
}

export function voteArticle(articleId, inc_votes) {
  return apiClient
    .patch(`articles/${articleId}`, { inc_votes })
    .then((response) => {
      return response.data.article;
    });
}

export function voteComment(commentId, inc_votes) {
  return apiClient
    .patch(`comments/${commentId}`, { inc_votes })
    .then((response) => {
      return response.data.comment;
    });
}
export function postComment(articleId, comment) {
  return apiClient
    .post(`articles/${articleId}/comments`, comment)
    .then((response) => {
      return response.data.comment;
    });
}

export function postArticle(article) {
  return apiClient.post(`articles/`, article).then((response) => {
    return response.data.article;
  });
}

export function getTopics() {
  return apiClient.get(`/topics/`).then((response) => {
    return response.data.topics;
  });
}
export function deleteComment(commentId) {
  return apiClient.delete(`/comments/${commentId}`);
}
