import React, { Component } from 'react';
import ArticleItem from './articleItem'
import { Layout,Button,Pagination } from 'antd';
import '../styles/articleItems.css'
import StateManager from '../utils/dealWithData'

export default class Article extends Component{
    constructor(){
        super()
        this.history = StateManager.getHistory()
    }

    componentDidMount(){
        let pathname = this.history.location.pathname
        let articleId = pathname.split('/')[2]

        StateManager.getArticleItemList(this,articleId).then(res=>{
            console.log(res)
        })
    }

    render(){
        let contentStyle = {padding:'10px',position: 'fixed',top: '115px',bottom: '7px',overflowY: 'auto',width:'800px',margin:'4px auto',left:0,right:0}
        return(
            <div>
                <div className="toolbar">
                    <Button type="primary">阅读模式</Button>
                    <Button type="primary">阅读模式</Button>
                    <Button onClick={()=>{}} type="primary" style={{marginLeft:'5px'}}>文章列表</Button>
                    <Pagination style={{float:'right'}} pageSize={1} defaultCurrent={1} total={10} />
                </div>
                <div style={contentStyle}>
                    <ArticleItem></ArticleItem>
                    <ArticleItem></ArticleItem>
                    <ArticleItem></ArticleItem>
                    <ArticleItem></ArticleItem> 
                </div>           
            </div>
        )
    }
}