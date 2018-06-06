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
        const {data} = this.props
        this.history.push(`/articleItem/${data.id}`)
    }

    render(){
        const {data} = this.props
        return (
            <div className="aContainer">
                <Card title={data.title} style={{height:'215px'}} bordered={false}>
                    <p style={{margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>作者：{data.address}</p>
                    <div className="aContent">{data.content}</div>
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

