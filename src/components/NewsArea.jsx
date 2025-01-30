import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import "./style.css";

export const NewsArea = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
        let response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="news-container">
      <h2>
        <span className="badge">Latest News</span>
      </h2>

      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : articles.length > 0 ? (
        <div className="news-grid">
          {articles.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title || "No Title"}
              description={news.description || "No Description Available"}
              src={news.urlToImage || "https://via.placeholder.com/150"}
              url={news.url || "#"}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Loading articles or no news available.</p>
      )}
    </div>
  );
};

export default NewsArea;
