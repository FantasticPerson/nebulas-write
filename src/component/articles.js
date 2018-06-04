import React, { Component } from 'react';
import Article from './article'
import {getArticles,saveArticle} from '../utils/nebulasUtils'
import ReactLoading from 'react-loading'

class Articles extends Component{
    constructor(){
        super()
        this.state={isLoading:true,articleList:null}
    }

    componentDidMount(){
        getArticles().then((res)=>{
            this.setState({articleList:res.articles})
        })
        .catch((err)=>{
            console.log(err)
        })

        saveArticle('123','456')
    }

    render(){
        const {isLoading,articleList} = this.state
        if(!isLoading){
            let articleListArr = articleList.map(item=>{
                return <Article key={item.articleId} data={item}></Article>
            })
            return (
                <div>
                    {articleListArr}
                </div>
            )
        } else {
            return (
                <div>
                    <ReactLoading type={'bars'} color={'#91d5ff'} width={60}></ReactLoading>
                </div>
            )
        }
    }
}

export default Articles