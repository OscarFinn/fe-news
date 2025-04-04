import { useState, useEffect, useContext } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";

import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";
import DeleteArticle from "./DeleteArticle";
import SortArticles from "./SortArticles";

import LoadingAnim from "./LoadingAnim";

export default function ArticleList() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(2);
  const [limit, setlimit] = useState(10);

  const { topic } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  useEffect(() => {
    const params = { topic: topic, sortBy, order, limit };
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null)
    );
    setIsLoading(true);
    setIsError(false);
    getArticles(cleanedParams)
      .then(([articles, total_count]) => {
        setArticles(articles);
        setCount(total_count);
      })
      .catch((err) => {
        setIsError(true);
        setError("Failed to load articles");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, searchParams]);

  function handleLoadMore() {
    setIsLoadingMore(true);
    setPage(page + 1);
    const params = { topic: topic, sortBy, order, limit, page };
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null)
    );
    getArticles(cleanedParams)
      .then(([newArticles]) => {
        const combinedArticles = [...articles, ...newArticles];
        setArticles(combinedArticles);
      })
      .catch((err) => {
        setIsError(true);
        setError("Failed to load articles");
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }

  if (isLoading) {
    return <LoadingAnim />;
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
      {topic ? (
        <h2>
          {topic.toUpperCase()} ({count})
        </h2>
      ) : (
        <h2>ALL ARTICLES ({count})</h2>
      )}
      <ul className="article-list">
        <li className="sort-li">
          <SortArticles
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </li>
        {articles.map((article) => {
          return (
            <li className="article-card-list">
              {user.username === article.author ? (
                <DeleteArticle
                  id={article.article_id}
                  articles={articles}
                  setArticles={setArticles}
                  className="article-card-delete"
                />
              ) : null}
              <ArticleCard key={article.article_id} articleFromList={article} />
            </li>
          );
        })}
      </ul>
      {isLoadingMore ? <LoadingAnim /> : null}
      {articles.length < count ? (
        <button onClick={handleLoadMore}>Load More</button>
      ) : null}
    </section>
  );
}
