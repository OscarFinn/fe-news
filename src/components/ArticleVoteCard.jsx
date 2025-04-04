import UpvoteRocket from "../assets/upvoteRocket.svg?react";
import DownvoteRocket from "../assets/downvoteRocket.svg?react";

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
        className="vote-button"
        onClick={(e) => {
          handleVote(e, 1);
        }}
      >
        <UpvoteRocket className="upvote" />
      </button>
      <span>{voteCount}</span>
      <button
        className="vote-button"
        onClick={(e) => {
          handleVote(e, -1);
        }}
      >
        <DownvoteRocket className="downvote" />
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  );
}
