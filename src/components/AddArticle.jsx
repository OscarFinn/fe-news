import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";

import { postArticle } from "../api";
import TopicsDropdown from "./TopicsDropdown";
import { useNavigate } from "react-router-dom";

export default function AddArticle() {
  const nav = useNavigate();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [article_img_url, setArticleImg] = useState("");
  const [topic, setTopic] = useState("");

  const [error, setError] = useState(null);

  const [isPosting, setIsPosting] = useState(false);

  function handleSubmit(e) {
    setIsPosting(true);
    e.preventDefault();
    const article = {
      title,
      body,
      article_img_url,
      topic,
      author: user.username,
    };
    postArticle(article)
      .then((response) => {
        nav("/");
      })
      .catch((err) => {
        setError("Unable to post article");
      })
      .finally(() => {
        setIsPosting(false);
      });
  }

  if (isPosting) {
    return <p> Posting article...</p>;
  }

  return (
    <section>
      <h2>Write an Article</h2>
      <form className="article-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TopicsDropdown setTopic={setTopic} />
        <label htmlFor="body">Article Body</label>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          required
        />
        <label htmlFor="img_url">Article Image URL</label>
        <input
          name="img_url"
          type="text"
          value={article_img_url}
          onChange={(e) => setArticleImg(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error ? <p>{error}</p> : null}
    </section>
  );
}
