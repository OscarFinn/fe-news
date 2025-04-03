import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import AddArticle from "./components/AddArticle";
import Profile from "./components/Profile";
import TopicList from "./components/TopicList";
import NavSidebar from "./components/NavSidebar";

import "./App.css";

function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <NavSidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarOpen} />
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
