import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import AddArticle from "./components/AddArticle";
import Profile from "./components/Profile";
import TopicList from "./components/TopicList";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <section className="content-container">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/:topic/" element={<ArticleList />} />
          <Route path="/topics/" element={<TopicList />} />
          <Route path="/article/:article_id" element={<ArticlePage />} />
          <Route path="/submit" element={<AddArticle />} />
          <Route path="/user/:username" element={<Profile />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
