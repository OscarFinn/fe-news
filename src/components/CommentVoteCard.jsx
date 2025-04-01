import Rocket from "../assets/rocket.svg?react";

import { useState } from "react";

import { voteComment } from "../api";

export default function CommentVoteCard({ comment }) {
  const [voteCount, setVoteCount] = useState(comment.votes);
  const [error, setError] = useState(null);

  const handleVote = (event, voteChange) => {
    event.preventDefault();
    setError(null);
    setVoteCount((currentVoteCount) => currentVoteCount + voteChange);
    voteComment(comment.comment_id, voteChange).catch((err) => {
      setVoteCount((currentVoteCount) => currentVoteCount - voteChange);
      setError("Your vote change was unsuccesful, please try again");
    });
  };
  return (
    <div className="comment-vote-card">
      <button
        className="vote-button"
        onClick={(e) => {
          handleVote(e, 1);
        }}
      >
        <Rocket className="upvote" />
      </button>
      <span>{voteCount}</span>
      <button
        className="vote-button"
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
