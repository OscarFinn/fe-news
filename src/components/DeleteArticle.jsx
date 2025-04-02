import { deleteArticle } from "../api";

import { useState } from "react";

export default function DeleteArticle({ id, articles, setArticles }) {
  const [error, setError] = useState(null);
  function handleDelete() {
    const originalArticles = [...articles];
    const optimisticDelete = articles.filter((article) => {
      return article.article_id != id;
    });
    setArticles(optimisticDelete);
    deleteArticle(id).catch((err) => {
      setError("Failed to delete article");
      setArticles(originalArticles);
    });
  }

  return (
    <div className="delete-div">
      <button className="delete-button" onClick={handleDelete}>
        X
      </button>
      {error ? <p className="delete-error">{error}</p> : null}
    </div>
  );
}
