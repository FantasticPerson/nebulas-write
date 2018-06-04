import React, { Component } from 'react';
import ArticleItem from './articleItem'

export default class Article extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>            
            </div>
        )
    }
}