import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";

import { postArticle, getTopics } from "../api";
import TopicsDropdown from "./TopicsDropdown";

export default function AddArticle() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [article_img_url, setArticleImg] = useState("");
  const [topic, setTopic] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ author: user.username, title, body, article_img_url, topic });
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
        />
        <TopicsDropdown setTopic={setTopic} />
        <label htmlFor="body">Article Body</label>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
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
    </section>
  );
}
