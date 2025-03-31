import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";

import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  console.log(articles);
  const topic = useParams();

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);
  return (
    <section className="article-list">
      <h2>This is where the articles will be listed</h2>
      {articles.map((article) => {
        return <ArticleCard article={article} />;
      })}
    </section>
  );
}
