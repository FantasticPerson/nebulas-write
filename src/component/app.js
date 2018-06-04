import React, { Component } from 'react';
import Cookie from 'js-cookie'

import Content from './content'
import HomePage from './homePage'
import Article from './article'

import {BrowserRouter,Route,Router} from 'react-router'
import {createBrowserHistory} from 'history'

class App extends Component {
  constructor() {
    super()
    this.state={
      route:'homepage'
    }
  }


  onGoClick(){
    this.setState({route:'content'})
  }

  showHomePage(){
    this.setState({route:'homepage'})
  }

  componentDidMount(){
    var login = Cookie.get('hasLogin')
    Cookie.set('hasLogin','login',{expires:30})
    if(login == 'login'){
      this.setState({
        route:'content'
      })
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderHomePage()}
        {this.renderContent()}
      </div>
    );
  }

  // render(){
  //   const customHistory = createBrowserHistory()
  //   return (
  //     <BrowserRouter>
  //       <Router history={BrowserRouter}>
  //         <Route path="/home" component={HomePage}></Route>
  //         <Route path="/article" component={Article}></Route>
  //         <Route path="/articleItem"></Route>
  //       </Router>
  //     </BrowserRouter>
  //   )
  // }

  renderHomePage(){
    const {route} = this.state
    if(route === 'homepage'){
      return(
        <div style={{height:'100%'}}>
          <HomePage onGoClick={this.onGoClick.bind(this)}></HomePage>
        </div>
      )
    }
  }

  renderContent(){
    const {route} = this.state
    if(route === 'content'){
      return (
        <div style={{height:'100%'}}>
          <Content showHomePage={this.showHomePage.bind(this)}></Content>
        </div>
      )
    }
  }
}

export default App;
