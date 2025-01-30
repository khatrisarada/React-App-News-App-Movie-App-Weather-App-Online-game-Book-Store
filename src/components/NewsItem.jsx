const NewsItem = ({ title, description, src, url }) => {
  return (
    <div className="news-card">
      <img src={src} alt="News thumbnail" />
      <div className="news-card-content">
        <h5 className="news-card-title">{title.slice(0, 50)}</h5>
        <p className="news-card-description">
          {description ? description.slice(0, 90) : "This is breaking news right now."}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
