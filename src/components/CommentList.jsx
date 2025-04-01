import { useState, useEffect } from "react";

import { getArticleComments } from "../api";

import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

export default function CommentList({ article }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
            <ul>
              <CommentCard key={comment.comment_id} comment={comment} />
            </ul>
          );
        })}
      </li>
    </section>
  );
}
