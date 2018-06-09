import React, { Component } from 'react';
import { Layout,Button,Pagination } from 'antd';
import '../styles/header.css'
import StateManager from '../utils/stateManager'

export default class Head extends Component{
    constructor(){
        super()
        this.history = StateManager.getHistory()
        this.history.listen(()=>{
            this.setState({pathname:this.history.location.pathname})
        })
        this.state = {pathname:this.history.location.pathname}
    }

    onNavClick(route){
        StateManager.routerPush(route)
    }

    render(){
        const {pathname} = this.state
        if(pathname == '/home'){
            return <div></div>
        }

        const {Header, Footer, Content} = Layout
        const headerStyle = {
            padding:'0 10px',
            transition: 'all .3s',
            background: '#fff',
            boxShadow: '0 2px 8px #f0f1f2',
            position: 'relative'
        }
        return (
            <Header style={headerStyle}>
                <span>
                    <i style={{fontSize:'35px'}} className="icon iconfont icon-readingandwritingabookwithinkandafeather"></i>
                    <span style={{
                        fontSize: '20px',
                        verticalAlign: '6px',
                        marginLeft:'10px'
                    }}>星云共同写作平台</span>
                </span>
                <span className="btnContainer">
                    <span onClick={()=>{this.onNavClick('/article')}} className={'btn selected'}>文章</span>
                    <span onClick={()=>{this.onNavClick('/home')}} className={'btn selected'}>欢迎页</span>
                    <span onClick={()=>{this.onNavClick('/guide')}} className={'btn selected'}>使用教程</span>
                </span>
            </Header>
        )
    }
}