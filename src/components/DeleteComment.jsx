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
        X
      </button>
      {error ? <p className="delete-error">{error}</p> : null}
    </div>
  );
}
