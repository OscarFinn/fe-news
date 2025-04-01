import { Link } from "react-router-dom";

import Rocket from "../assets/rocket.svg?react";

export default function ArticleCard({ article }) {
  const altText = article.title;
  const articleLink = `/article/${article.article_id}`;
  return (
    <Link to={articleLink}>
      <section className="article-card">
        <p className="article-topic">{article.topic}</p>
        <h3 className="article-title">{article.title}</h3>
        <img src={article.article_img_url} alt={altText} />
        <p className="votes">
          <Rocket height="30px" />
          {article.votes}
        </p>
        <p className="article-author">{article.author}</p>
      </section>
    </Link>
  );
}
