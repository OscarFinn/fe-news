export default function TopicCard({ topic }) {
  console.log(topic);
  return (
    <div className="topic-card">
      <h2>{topic.slug}</h2>
      <p>{topic.description}</p>
    </div>
  );
}
