import React, { Component } from 'react';
import {Card} from 'antd'
import '../styles/article.css'
import StateManager from '../utils/stateManager'

class Article extends Component{
    constructor(){
        super()
        this.history = StateManager.getHistory()
    }
    onItemClick(id){
        const {data} = this.props
        StateManager.setArticleId(id)
        StateManager.routerPush('/articleItem')
    }

    render(){
        const {data} = this.props
        return (
            <div className="aContainer">
                <Card title={data.title} style={{height:'215px'}} bordered={false}>
                    <p style={{margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>作者：{data.address}</p>
                    <div className="aContent">{data.content}</div>
                    <div className="aBtns">
                        <span onClick={()=>{this.onItemClick(data.id)}} style={{float: 'right',marginTop: '-3px'}}>
                            <i style={{fontSize: '23px',color: '#91d5ff',cursor:'pointer'}} className="icon iconfont icon-cc-arrow-circle-right"></i>
                        </span>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Article

