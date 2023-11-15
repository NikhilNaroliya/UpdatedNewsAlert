import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "./Sidebar";
import "./NewsItem.css";
import "./News.css"; // Import the stylesheet


const News = ({ setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [userKeywords, setUserKeywords] = useState([]);

  // Load user keywords from local storage on component mount
  useEffect(() => {
    const storedKeywords = localStorage.getItem("userKeywords");
    if (storedKeywords) {
      setUserKeywords(JSON.parse(storedKeywords));
    }
  }, []);

  // Save user keywords to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("userKeywords", JSON.stringify(userKeywords));
  }, [userKeywords]);

  const updateNews = async (currentKeyword) => {
    setProgress(10);
    const url = `https://newsapi.org/v2/everything?q=${currentKeyword}&sortBy=publishedAt&apiKey=61f2ecc2cba6494b9706ebb842729459&pageSize=20&page=${page}`;
    setLoading(true);

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      const articlesArray = Array.isArray(parsedData.articles) ? parsedData.articles : [];
      const totalResults = parsedData.totalResults || 0;

      setArticles((prevArticles) => [...prevArticles, ...articlesArray]);
      setTotalResults(totalResults);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error updating news:", error);
      setLoading(false);
      setProgress(100);
    }
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      setUserKeywords((prevKeywords) => [...prevKeywords, keyword]);
      setPage(1); // Reset page when a new keyword is searched
      setArticles([]); // Clear existing articles when a new keyword is searched
      updateNews(keyword);
    }
  };

  useEffect(() => {
    // Fetch news based on the latest keyword entered by the user
    if (userKeywords.length > 0) {
      updateNews(userKeywords[userKeywords.length - 1]);
    } else {
      // Fetch default news when no keyword is entered
      updateNews("default");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKeywords, page]);

  const fetchMoreData = () => {
    // Fetch more news based on the latest keyword in userKeywords
    if (userKeywords.length > 0) {
      setPage((prevPage) => prevPage + 1);
      updateNews(userKeywords[userKeywords.length - 1]);
    }
  };

  return (
    <div className="container my-3">
      <div>
        <input
          type="text"
          placeholder="Enter a keyword"
          value={keyword}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>+ KeyWords</button>
      </div>
      <div>
        <p>User Keywords: {userKeywords.join(", ")}</p>
      </div>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsAlert - Top Picks For You
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
        <Sidebar newsItems={[]} watchlist={[]} />
      </InfiniteScroll>
    </div>
  );
};

export default News;
