import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getArticle } from "../api";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>{error.msg}</p>;
  }
  return (
    <section className="article-page">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </section>
  );
}
