import Rocket from "../assets/rocket.svg?react";

import { useState } from "react";

import { voteArticle } from "../api";

export default function ArticleVoteCard({ article }) {
  const [voteCount, setVoteCount] = useState(article.votes);
  const [error, setError] = useState(null);

  const handleVote = (event, voteChange) => {
    event.preventDefault();
    setError(null);
    setVoteCount((currentVoteCount) => currentVoteCount + voteChange);
    voteArticle(article.article_id, voteChange).catch((err) => {
      setVoteCount((currentVoteCount) => currentVoteCount - voteChange);
      setError("Your vote change was unsuccesful, please try again");
    });
  };
  return (
    <div className="article-vote-card">
      <button
        onClick={(e) => {
          handleVote(e, 1);
        }}
      >
        <Rocket className="upvote" />
      </button>
      <span>{voteCount}</span>
      <button
        onClick={(e) => {
          handleVote(e, -1);
        }}
      >
        <Rocket className="downvote" />
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  );
}
