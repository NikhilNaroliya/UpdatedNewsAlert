import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "./Sidebar";
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =
    "https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=61f2ecc2cba6494b9706ebb842729459&pageSize=20";
    this.setState({ loading: true });
    let data = await fetch(url);
    // this.props.setProgress(30);
    let parsedData = await data.json();
    // this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url =
    "https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=61f2ecc2cba6494b9706ebb842729459&pageSize=20";
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px' , marginTop:'90px'}}>NewsAlert - Top Picks For You</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
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
            );
          })}
          </div>
        </div>
        <Sidebar
            newsItems={this.state.newsItems}
            watchlist={this.state.watchlist}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
