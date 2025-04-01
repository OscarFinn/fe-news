import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";

import { postComment } from "../api";

export default function AddComment({ article, comments, setComments }) {
  const { user } = useContext(UserContext);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    const currentTime = new Date();
    e.preventDefault();
    setError(null);
    const newComment = { username: user.username, body };
    const optimisticComment = {
      author: user.username,
      body,
      created_at: currentTime,
      votes: 0,
    };
    const newCommentsArr = [...comments];
    newCommentsArr.unshift(optimisticComment);
    setComments(newCommentsArr);
    postComment(article.article_id, newComment).catch((err) => {
      setError("Comment failed to post, try again");
      const errComments = [...newCommentsArr];
      errComments.shift();
      setComments(errComments);
    });
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="body">Write a comment:</label>
        <input
          name="body"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error ? <p>{error}</p> : null}
    </section>
  );
}
