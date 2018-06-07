import React, { Component } from 'react';
import ArticleItem from './articleItem'
import { Layout,Button,Pagination } from 'antd';
import ReactLoading from 'react-loading'
import '../styles/articleItems.css'
import StateManager from '../utils/dealWithData'

export default class Article extends Component{
    constructor(){
        super()
        this.history = StateManager.getHistory()
        this.state = {data:null}
    }

    componentDidMount(){
        let pathname = this.history.location.pathname
        let articleId = pathname.split('/')[2]

        StateManager.getArticleItemList(this,articleId).then(()=>{
            let data = StateManager.enterItem(articleId)
            this.setState({data:data})
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
                    {this.renderContent()}
                </div>           
            </div>
        )
    }

    renderContent(){
        const {data} = this.state
        if(data){
            let articleItems = data.map((item)=>{
                return (<ArticleItem key={item.data.id} data={item}></ArticleItem>)
            })
            return (
                <div>
                    {articleItems}
                </div>
            )
        } else {
            return(
                <div style={{margin:'10px auto',width:'60px'}}>
                    <ReactLoading type={'spin'} color={'#91d5ff'}  height={100} width={60} delay={0}></ReactLoading>
                </div>
            )
        }
    }
}