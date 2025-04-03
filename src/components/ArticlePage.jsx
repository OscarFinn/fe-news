import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";

import { getArticle } from "../api";

import CommentList from "./CommentList";
import ArticleVoteCard from "./ArticleVoteCard";
import DeleteArticle from "./DeleteArticle";
import { handleDates } from "../utils";

import Back from "../assets/back.svg?react";

export default function ArticlePage() {
  const { user } = useContext(UserContext);

  const nav = useNavigate();

  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
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
      {user.username === article.author ? (
        <DeleteArticle id={article.article_id} />
      ) : null}
      <div className="article">
        <button className="back-button" onClick={() => nav(-1)}>
          <Back />
        </button>
        <img src={article.article_img_url} />
        <h2>{article.title}</h2>
        <p>
          posted on {date} at {time} by {article.author}
        </p>
        <p>{article.body}</p>
        <ArticleVoteCard article={article} />
      </div>
      <div className="article-commments">
        <h2>Comments ({article.comment_count})</h2>
        <CommentList article={article} />
      </div>
    </section>
  );
}
