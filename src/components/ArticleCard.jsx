import { Link } from "react-router-dom";
import { useState } from "react";

import Rocket from "../assets/rocket.svg?react";

import ArticleVoteCard from "./ArticleVoteCard";
import ArticlePage from "./ArticlePage";

export default function ArticleCard({ articleFromList }) {
  const [article, setArticle] = useState(articleFromList);

  const altText = article.title;
  const articleLink = `/article/${article.article_id}`;
  return (
    <Link to={articleLink}>
      <section className="article-card">
        <p className="article-topic">{article.topic}</p>
        <h3 className="article-title">{article.title}</h3>
        <img src={article.article_img_url} alt={altText} />
        <ArticleVoteCard article={article} setArticle={setArticle} />
        <p className="article-author">{article.author}</p>
      </section>
    </Link>
  );
}
