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
    const tempBody = body;
    setBody("");
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
      setBody(tempBody);
      const errComments = [...newCommentsArr];
      errComments.shift();
      setComments(errComments);
    });
  }
  return (
    <section>
      <form
        name="comment-form"
        onSubmit={handleSubmit}
        className="comment-form"
      >
        <label htmlFor="body">Add a comment</label>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          required
        />
        <div className="comment-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
    </section>
  );
}
