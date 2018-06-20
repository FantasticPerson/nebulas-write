import React, { Component } from 'react';
import Cookie from 'js-cookie'

import Content from './content'
import HomePage from './homePage'
import Articles from './articles'
import Header from './header'
import ArticleItems from './articleItems'
import StateManeger from '../utils/stateManager'
import Guide from './guide'

import {Route,Router} from 'react-router'
import {BrowserRouter} from 'react-router-dom'


class App extends Component {
  constructor() {
    super()
    this.history = StateManeger.getHistory()
    this.history.listen((location)=>{
      console.log(location)
      this.setState({history:{...this.history,location:location}})
    })
    this.state={
      history:{
        ...this.history
      }
    }
  }

  componentDidMount(){
    const {location} = this.state.history

    if(!Cookie.get('hasEntered')){
      Cookie.set('hasEntered','true',{ expires: 30})
      StateManeger.routerPush(`/home`)
    }

    else {
      if(location.pathname == `${StateManeger.getPrefix()}/`){
        StateManeger.routerPush('/home')
      } else if(location.pathname == `${StateManeger.getPrefix()}/articleItem`){
        StateManeger.routerPush('/article')
      }
    }
  }

  render(){
    const {history} = this.state
    return (
      <div className="container">
        <BrowserRouter>
          <Router history={history}>
            <div style={{height:'100%'}}>
              <Header></Header>
              <Route path={`${StateManeger.getPrefix()}/home`} component={HomePage}></Route>
              <Route path={`${StateManeger.getPrefix()}/article` }component={Articles}></Route>
              <Route path={`${StateManeger.getPrefix()}/articleItem`} component={ArticleItems}></Route>
              <Route path={`${StateManeger.getPrefix()}/guide`} component={Guide}></Route>
            </div>
          </Router>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
