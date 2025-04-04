import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getTopics } from "../api";
import LoadingAnim from "./LoadingAnim";

export default function NavSidebar({ isOpen, setIsOpen }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <section>
      <div className={`sidebar ${isOpen ? `open` : ``}`}>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close Sidebar
        </button>
        {isLoading ? (
          <LoadingAnim />
        ) : (
          <div className="sidebar-topics">
            <Link
              to="/topics"
              onClick={() => setIsOpen(false)}
              state={{ topics }}
            >
              <h2>TOPICS</h2>
            </Link>
            {topics.map((topic) => {
              return (
                <Link to={`/${topic.slug}`} onClick={() => setIsOpen(false)}>
                  <p>{topic.slug.toUpperCase()}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {isOpen ? (
        <div
          className="overlay"
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      ) : null}
    </section>
  );
}
