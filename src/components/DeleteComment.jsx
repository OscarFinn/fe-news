import { deleteComment } from "../api";

import { useState } from "react";

import X from "../assets/x.svg?react";
import Bin from "../assets/bin.svg?react";

export default function DeleteComment({ id, comments, setComments }) {
  const [error, setError] = useState(null);

  function handleDelete() {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this comment?")) {
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
  }

  return (
    <div className="delete-div">
      <button className="delete-button" onClick={(e) => handleDelete(e)}>
        <Bin />
      </button>
      {error ? <p className="delete-error">{error}</p> : null}
    </div>
  );
}
