import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

    state = {
        progress:10
    }
    setProgress = (progress)=>{
        this.setState({progress:progress})
    }

    render() {
     const pageSize = 9;
        return (
            <div>
                <Router>
                    <Navbar />
                    <LoadingBar 
                        color='#f11946'
                        height={3}
                        progress={this.state.progress}
                    />
                    <Switch>
                        <Route exact path='/'> <News setProgress={this.setProgress} key='general' country="in" pageSize={pageSize} category="general" /></Route>
                        <Route exact path='/business'> <News setProgress={this.setProgress} key='business' country="in" pageSize={pageSize} category="business" /></Route>
                        <Route exact path='/sports'> <News setProgress={this.setProgress} key='sports' country="in" pageSize={pageSize} category="sports" /></Route>
                        <Route exact path='/technology'> <News setProgress={this.setProgress} key='technology' country="in" pageSize={pageSize} category="technology" /></Route>
                        <Route exact path='/science'> <News setProgress={this.setProgress} key='science' country="in" pageSize={pageSize} category="science" /></Route>
                        <Route exact path='/health'> <News setProgress={this.setProgress} key='health' country="in" pageSize={pageSize} category="health" /></Route>
                        <Route exact path='/entertainment'> <News setProgress={this.setProgress} key='entertainment' country="in" pageSize={pageSize} category="entertainment" /></Route>
                    </Switch>
                </Router>

            </div>
        )
    }
}

