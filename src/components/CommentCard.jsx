import { useState, useEffect } from "react";

import { handleDates } from "../utils";
import { getUser } from "../api";

import Rocket from "../assets/rocket.svg?react";

export default function CommentCard({ comment }) {
  const [commentUser, setCommentUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getUser(comment.author)
      .then((user) => {
        setCommentUser(user);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [comment.author]);

  const { relativeTime } = handleDates(comment.created_at);
  return (
    <div className="comment-card">
      <div className="comment-left">
        <div className="comment-avatar">
          <img src={commentUser.avatar_url} alt={comment.author} />
        </div>
        <div className="comment-votes">
          <span>{comment.votes} </span>
          <span>
            <Rocket className="rocket-svg" />
          </span>
        </div>
      </div>
      <div className="comment-content">
        <div className="comment-header">
          <p className="comment-author">{comment.author}</p>
          <p>{relativeTime}</p>
        </div>
        <p className="comment-body">{comment.body}</p>
      </div>
    </div>
  );
}
