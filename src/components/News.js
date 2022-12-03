import React, { Component } from 'react'
import NewsItem from './NewsItem'
import articles from '../sampleResponse.json'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'science'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super();
        console.log(articles);

        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0
        }
        document.title = `${this.capitalize(props.category)} - NewsMonkey`;

    }

    async updateDom() {
        this.props.setProgress(10);
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85b8d8dddc5e48148f00ba8089e64e15&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.props.setProgress(10);
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85b8d8dddc5e48148f00ba8089e64e15&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateDom();
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateDom();
    // }
    capitalize(element) {
        let str = element.charAt(0).toUpperCase() + element.slice(1);
        return str;
    }

    fetchMoreData = async () => {
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85b8d8dddc5e48148f00ba8089e64e15&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    render() {
        return (

            <>

                <h2 className="text-center" style={{marginTop:'70px'}}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines </h2>
                <div className="container my-1"><hr /></div>
                {this.state.loading && <Loader />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (<div className="col md-4 my-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>)
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1 ? true : false} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; prev</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
                </div> */}


            </>
        )
    }
}
