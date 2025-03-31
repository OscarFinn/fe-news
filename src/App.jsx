import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/:topic/" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
