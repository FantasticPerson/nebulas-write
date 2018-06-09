import React, { Component } from 'react';
import Cookie from 'js-cookie'

import Content from './content'
import HomePage from './homePage'
import Articles from './articles'
import Header from './header'
import ArticleItems from './articleItems'
import StateManeger from '../utils/stateManager'

import {Route,Router} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.history = StateManeger.getHistory()
    this.history.listen((location)=>{
      this.setState({history:{...this.history,location:location}})
    })
    this.state={
      history:{
        ...this.history
      }
    }
  }

  componentDidMount(){
    this.history.push('/home')
  }

  render(){
    const {history} = this.state
    return (
      <div className="container">
        <BrowserRouter>
          <Router history={history}>
            <div style={{height:'100%'}}>
              <Header></Header>
              <Route path="/home" component={HomePage}></Route>
              <Route path="/article" component={Articles}></Route>
              <Route path="/articleItem" component={ArticleItems}></Route>
            </div>
          </Router>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
