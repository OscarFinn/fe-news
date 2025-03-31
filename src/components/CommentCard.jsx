import { handleDates } from "../utils";

export default function CommentCard({ comment }) {
  //console.log(comment);
  const { relativeTime } = handleDates(comment.created_at);
  return (
    <div className="comment-card">
      <p>{comment.author}</p>
      <p>{relativeTime}</p>
      <p>{comment.body}</p>
    </div>
  );
}
