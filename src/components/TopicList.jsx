import { useState, useEffect } from "react";
import { getTopics } from "../api";
import { Link, useLocation } from "react-router-dom";

import TopicCard from "./TopicCard";

export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.topics) {
      setTopics(location.state.topics);
    } else {
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
    }
  }, [location.state]);

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
          <li className="topic-list">
            <Link to={`/${topic.slug}`}>
              <TopicCard key={topic.slug} topic={topic} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
