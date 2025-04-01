import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";

import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const topic = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
  return (
    <ul className="article-list">
      {articles.map((article) => {
        const articleLink = `/article/${article.article_id}`;
        return (
          <li>
            <ArticleCard key={article.article_id} articleFromList={article} />
          </li>
        );
      })}
    </ul>
  );
}
