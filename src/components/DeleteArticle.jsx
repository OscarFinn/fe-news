import { deleteArticle } from "../api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import X from "../assets/x.svg?react";
import Rocket from "../assets/rocket.svg?react";

export default function DeleteArticle({
  id,
  articles = null,
  setArticles = null,
}) {
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
    if (articles && setArticles) {
      const originalArticles = [...articles];
      const optimisticDelete = articles.filter((article) => {
        return article.article_id != id;
      });
      setArticles(optimisticDelete);
    }
    deleteArticle(id)
      .then(() => {
        if (!articles) {
          nav("/");
        }
      })
      .catch((err) => {
        setError("Failed to delete article");
        if (setArticles) {
          setArticles(originalArticles);
        }
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <div className="delete-div">
      <button className="delete-button" onClick={handleDelete}>
        <X />
      </button>
      {error ? <p className="delete-error">{error}</p> : null}
    </div>
  );
}
