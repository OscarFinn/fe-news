import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";

import { getArticleComments } from "../api";

import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";

export default function CommentList({ isLoading, setIsLoading, article }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticleComments(article.article_id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        setIsError(true);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return (
      <p>
        {error.status}: {error.response.data.msg}
      </p>
    );
  }
  return (
    <section className="comment-section">
      <AddComment
        article={article}
        comments={comments}
        setComments={setComments}
      />
      <li className="comments-list">
        {comments.map((comment) => {
          return (
            <ul className="comment-container">
              {user.username === comment.author ? (
                <DeleteComment
                  id={comment.comment_id}
                  comments={comments}
                  setComments={setComments}
                />
              ) : (
                <div className="empty"></div>
              )}
              <CommentCard key={comment.comment_id} comment={comment} />
            </ul>
          );
        })}
      </li>
    </section>
  );
}
