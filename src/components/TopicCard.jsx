export default function TopicCard({ topic }) {
  console.log(topic);
  return (
    <div className="topic-card">
      <div className="topic-img-container">
        {topic.img_url.length > 0 ? (
          <img
            className="topic-card-img"
            src={topic.img_url}
            alt={topic.slug}
          />
        ) : (
          <img
            className="topic-card-img"
            src="https://theculinarycellar.com/wp-content/uploads/2014/09/card-catalog-open-1.jpg"
            alt={topic.slug}
          />
        )}
      </div>
      <div className="topic-card-text">
        <h2 className="topic-card-title">{topic.slug}</h2>
        <p className="topic-card-description">{topic.description}</p>
      </div>
    </div>
  );
}
