import { useState, useEffect } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";

import TopicCard from "./TopicCard";

export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("loading topics page");
    setIsLoading(true);
    getTopics()
      .then((response) => {
        setTopics(response);
      })
      .catch((err) => {
        setError("Failed to load topics list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ul>
      {topics.map((topic) => {
        return (
          <li>
            <Link to={`/${topic.slug}`}>
              <TopicCard key={topic.slug} topic={topic} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
