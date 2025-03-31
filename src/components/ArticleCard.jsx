export default function ArticleCard({ article }) {
  console.log(article, "<-- article in articlecard");
  const altText = article.title;
  return (
    <section className="article-card">
      <h3>{article.title}</h3>
      <h4>{article.topic}</h4>
      <h4>{article.author}</h4>
      <p>{article.votes}</p>
      <img src={article.article_img_url} alt={altText} />
    </section>
  );
}
