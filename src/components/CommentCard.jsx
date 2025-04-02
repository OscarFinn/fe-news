import { useState, useEffect, useContext } from "react";

import { handleDates } from "../utils";
import { getUser } from "../api";

import CommentVoteCard from "./CommentVoteCard";

import { UserContext } from "../contexts/User";

export default function CommentCard({ comment }) {
  const [commentUser, setCommentUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);

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
        <CommentVoteCard comment={comment} />
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
