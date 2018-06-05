import React, { Component } from 'react';
import Article from './article'
import {getArticles,saveArticle} from '../utils/nebulasUtils'
import ReactLoading from 'react-loading'
import StateManager from '../utils/dealWithData'

class Articles extends Component{
    constructor(){
        super()
        this.state={articleList:null}
    }

    componentDidMount(){
        this._isMounted = true

        StateManager.getArticleList(this).then(res=>{
            if(this._isMounted){
                this.setState({articleList:res})
            }
        })
        /*getArticles().then((res)=>{
            this.setState({articleList:res.articles})
        })
        .catch((err)=>{
            console.log(err)
        })

        saveArticle('123','456')*/
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    render(){
        const {isLoading,articleList} = this.state
        let contentStyle = {padding:'10px',position: 'fixed',top: '65px',bottom: '7px',overflowY: 'auto',width:'800px',margin:'4px auto',left:0,right:0}
        if(articleList){
            const {articleClick} = this.props
            let articleListArr = articleList.map(item=>{
                return <Article articleClick={articleClick} key={item.articleId} data={item} key={item.data.id}></Article>
            })
            return (
                <div style={contentStyle}>
                    {articleListArr}
                </div>
            )
        } else {
            return (
                <div style={{margin:'10px auto',width:'60px'}}>
                    <ReactLoading type={'spin'} color={'#91d5ff'}  height={100} width={60} delay={0}></ReactLoading>
                </div>
            )
        }
    }
}

export default Articles