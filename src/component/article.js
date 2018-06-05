import React, { Component } from 'react';
import {Card} from 'antd'
import '../styles/article.css'
import StateManager from '../utils/dealWithData'

class Article extends Component{
    constructor(){
        super()
        this.history = StateManager.getHistory()
    }
    onClick(){
        this.history.push(`/articleItem/1`)
    }

    render(){
        return (
            <div className="aContainer">
                <Card title="article name" style={{height:'215px'}} bordered={false}>
                    <p style={{margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>作者：123</p>
                    <div className="aContent">12312 3123 sdfsd fsdfsd fsdfsd fsfsdf sdfsdfsd fsdfsd fsdf 456 err sdf sdf sdf sdf sdf sdf sdf sdf sdf </div>
                    <div className="aBtns">
                        <span onClick={()=>{this.onClick()}} style={{float: 'right',marginTop: '-3px'}}>
                            <i style={{fontSize: '23px',color: '#91d5ff',cursor:'pointer'}} className="icon iconfont icon-cc-arrow-circle-right"></i>
                        </span>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Article

