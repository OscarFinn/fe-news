import { useState, useEffect, useContext } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";

import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";
import DeleteArticle from "./DeleteArticle";
import SortArticles from "./SortArticles";

export default function ArticleList() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { topic } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(topic, sortBy, order)
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
  }, [topic, searchParams]);

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
    <section className="articles-container">
      <SortArticles
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <ul className="article-list">
        {articles.map((article) => {
          return (
            <li className="article-card-list">
              {user.username === article.author ? (
                <DeleteArticle
                  id={article.article_id}
                  articles={articles}
                  setArticles={setArticles}
                />
              ) : null}
              <ArticleCard key={article.article_id} articleFromList={article} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
