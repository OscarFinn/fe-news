import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getArticle } from "../api";

import CommentList from "./CommentList";
import { handleDates } from "../utils";

export default function ArticlePage() {
  const nav = useNavigate();

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
    return (
      <p>
        {error.status}: {error.response.data.msg}
      </p>
    );
  }
  const { date, time } = handleDates(article.created_at);
  return (
    <section className="article-page">
      <div className="article">
        <button onClick={() => nav(-1)}>Back</button>
        <img src={article.article_img_url} />
        <h2>{article.title}</h2>
        <p>
          posted on {date} at {time} by {article.author}
        </p>
        <p>{article.body}</p>
        <p>{article.votes}</p>
      </div>
      <div className="article-commments">
        <h2>Comments ({article.comment_count})</h2>
        <CommentList article_id={article.article_id} />
      </div>
    </section>
  );
}
