import { Link } from "react-router-dom";
import { useState } from "react";

import ArticleVoteCard from "./ArticleVoteCard";

import { handleDates } from "../utils";

export default function ArticleCard({ articleFromList }) {
  const [article, setArticle] = useState(articleFromList);

  const altText = article.title;
  const articleLink = `/article/${article.article_id}`;

  const { relativeTime } = handleDates(article.created_at);

  return (
    <Link to={articleLink} className="card-link">
      <section className="article-card">
        <div className="article-card-header">
          <Link to={`/${article.topic}`} className="text-link">
            <p className="article-topic">{article.topic.toUpperCase()}</p>
          </Link>
        </div>
        <div className="article-card-text">
          <h3 className="article-title">{article.title}</h3>
          <div className="article-card-info">
            <Link to={`/user/${article.author}`} className="text-link">
              <span className="article-author">{article.author} </span>
            </Link>
            <span className="article-created">{relativeTime}</span>
          </div>
        </div>
        <div className="article-card-content">
          <img src={article.article_img_url} alt={altText} />
        </div>
        <div className="article-card-footer">
          <ArticleVoteCard article={article} setArticle={setArticle} />
          <button className="goto-comments">
            Comments ({article.comment_count})
          </button>
        </div>
      </section>
    </Link>
  );
}
