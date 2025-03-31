import { useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const topic = useParams();
  return (
    <body>
      <h2>This is where the articles will be listed</h2>
    </body>
  );
}
