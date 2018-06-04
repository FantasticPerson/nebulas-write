import React, { Component } from 'react';
import Cookie from 'js-cookie'

import Content from './content'
import HomePage from './homePage'

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
