import React, { Component } from 'react'


export default class NewsItem extends Component {

    render() {

        let {title,description,imgUrl,newsUrl,date,author,source} = this.props;

        let style={
            width: '22rem'
        }
        let style1 = {
            left: "85%",
            zIndex: '1'
        }

        return (
            <div >
                <div className="card " style={style}>
                    <img src={!imgUrl?'https://static.foxnews.com/foxnews.com/content/uploads/2021/08/AP21239097224960.jpg':imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={style1}>{source}</span> </h5>
                        <p className="card-text">{!description?'In the latest case study researchers studying white-necked jacobins in Panama noticed that nearly 30% of the more than 120 females they captured and sexed between 2015':description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} on {date}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
