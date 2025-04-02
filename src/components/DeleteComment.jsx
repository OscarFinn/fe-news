import { deleteComment } from "../api";

import { useState } from "react";

export default function DeleteComment({ id, comments, setComments }) {
  const [error, setError] = useState(null);
  function handleDelete() {
    const originalComments = [...comments];
    const optimisticDelete = comments.filter((comment) => {
      return comment.comment_id != id;
    });
    setComments(optimisticDelete);
    deleteComment(id).catch((err) => {
      setError("Failed to delete comment");
      setComments(originalComments);
    });
  }

  return (
    <div className="delete-div">
      <button className="delete-button" onClick={handleDelete}>
        <svg viewBox="0 0 24 24">
          <path
            d="M6 6L18 18M6 18L18 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
      {error ? <p className="delete-error">{error}</p> : null}
    </div>
  );
}
