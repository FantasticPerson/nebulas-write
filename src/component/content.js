import React, { Component } from 'react';
import { Layout,Button,Pagination } from 'antd';
import '../styles/content.css'

import Article from './articleItems'

import Art from './article'

import Articles from './articles'

export default class Content extends Component{
    constructor(){
        super()
        this.state = {btnClicked:0,mode:'article',appData:{articleList:[]}}
    }

    onBtnClick(index){
        if(index == 2){
            const{showHomePage} = this.props
            showHomePage()
        } else {
            this.setState({btnClicked:index})
        }

    }

    

    onArticleClick(id){
        this.setState({mode:'articleItem'})
        console.log(id)
    }

    onArticleListClick(){
        this.setState({mode:'article'})
    }

    render(){
        const {Header, Footer, Content} = Layout
        const headerStyle = {
            padding:'0 10px',
            transition: 'all .3s',
            background: '#fff',
            boxShadow: '0 2px 8px #f0f1f2',
            position: 'relative'
        }
        const {btnClicked,mode} = this.state
        let contentStyle = {padding:'10px',position: 'fixed',top: '115px',bottom: '7px',overflowY: 'scroll',left: 0,right: 0}

        if(mode == 'article'){
            contentStyle.top = '65px'
        }

        return (
            <div className="container">
                <Layout style={{height:'100%'}}>
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
                            <span onClick={()=>{this.onBtnClick(0)}} className={btnClicked === 0 ? 'btn selected' : 'btn'}>文章</span>
                            <span onClick={()=>{this.onBtnClick(1)}} className={btnClicked === 1 ? 'btn selected' : 'btn'}>个人中心</span>
                            <span onClick={()=>{this.onBtnClick(2)}} className={btnClicked === 2 ? 'btn selected' : 'btn'}>欢迎页</span>
                        </span>
                    </Header>
                    {this.renderToolbar()}
                    <Content style={contentStyle}>
                        <div>
                            {this.renderArticleItems()}
                            {this.renderArticles()}
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }

    renderToolbar(){
        const {mode} = this.state
        if(mode == 'articleItem'){
            return (
                <div className="toolbar">
                    <Button type="primary">阅读模式</Button>
                    <Button onClick={()=>{this.onArticleListClick()}} type="primary" style={{marginLeft:'5px'}}>文章列表</Button>
                    <Pagination style={{float:'right'}} pageSize={1} defaultCurrent={1} total={10} />
                </div>
            )
        }
    }

    renderArticles(){
        const {mode} = this.state
        if(mode == 'article'){
            return (
                <div className="articleList">
                    <Articles></Articles>
                </div>
            )
        }
    }

    renderArticleItems(){
        const {mode} = this.state
        if(mode == 'articleItem'){
            return (
                <div>
                    <Article></Article>
                </div>
            )
        }
    }
}