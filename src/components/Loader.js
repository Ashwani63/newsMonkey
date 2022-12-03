import React, { Component } from 'react'
import loading from './loader.gif'

export default class Loader extends Component {
    render() {

        let style = {
            height:'33px',
            width : '33px'
        }

        return (
            <div className="container my-2 text-center">
                <img src={loading} alt="..."   style={style} / >
            </div>
        )
    }
}
