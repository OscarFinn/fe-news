import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  console.log(article, "<-- article in articlecard");
  const altText = article.title;
  const articleLink = `/article/${article.article_id}`;
  return (
    <Link to={articleLink}>
      <section className="article-card">
        <p className="article-topic">{article.topic}</p>
        <h3 className="article-title">{article.title}</h3>
        <img src={article.article_img_url} alt={altText} />
        <p className="votes">{article.votes}</p>
        <p className="article-author">{article.author}</p>
      </section>
    </Link>
  );
}
