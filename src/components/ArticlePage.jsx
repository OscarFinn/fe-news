import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getArticle } from "../api";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  console.log(article);
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
    return (
      <p>
        {error.status}: {error.response.data.msg}
      </p>
    );
  }
  const fullDate = new Date(article.created_at);
  const date = fullDate.toLocaleDateString();
  const time = fullDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <section className="article-page">
      <img src={article.article_img_url} />
      <h2>{article.title}</h2>
      <p>
        posted on {date} at {time} by {article.author}
      </p>
      <p>{article.body}</p>
      <p>{article.votes}</p>
    </section>
  );
}
