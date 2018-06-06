import React, { Component } from 'react';
import ReactLoading from 'react-loading'
import {Button} from 'antd'

import Comments from './comments'
import '../styles/articleItem.css'

export default class ArticleItem extends Component{
    constructor(){
        super()
        this.state = {isLoad:false,isLoading:false,showChildren:false,showComments:false}
    }

    onShowChildrenClick(){
        const {showChildren} = this.state
        this.setState({showChildren:!showChildren})
    }

    onShowComment(){
        const{showComments} = this.state
        this.setState({showComments:!showComments})
        if(!showComments){
            this.setState({showChildren:false})
        }
    }

    render(){
        const {showChildren,showComments} = this.state
        let dropdownClass = `icon iconfont icon-downarrow ${showChildren?'':'erase'}`
        return (
            <div className="articleItem">
                <p>{'作者：xiaobudian'}</p>
                <div>
                    <span className="articleItemText">{'test test test test test test test test test test'}</span>
                </div>
                <div className="articleItemBtns">
                    <span><i style={{verticalAlign:'2px'}} className="icon iconfont icon-good"></i><i className="itemText">{'5'}</i></span>
                    <span><i className="icon iconfont icon-bad"></i><i className="itemText">{'5'}</i></span>
                    <span onClick={()=>{
                        this.onShowComment()
                    }}><i className="icon iconfont icon-huifu"></i><i className="itemText">{'5'}</i></span>
                    {
                        showComments ? '' : <span onClick={()=>{this.onShowChildrenClick()}}><i style={{fontSize:'20px',float:'right'}} className={dropdownClass}></i></span>
                    }
                    <Button type="primary" style={{height:'30px',color:'#FFF'}}>续写</Button>
                    
                </div>
                {this.renderChildren()}
                {this.renderComments()}
            </div>
        )
    }

    renderComments(){
        const {showComments} = this.state
        if(showComments){
            return (
                <Comments onShowCommentClick={this.onShowComment.bind(this)}></Comments>
            )
        }
    }

    renderChildren(){
        const {showChildren,isLoading,showComments} = this.state
        if(showChildren && !showComments){
            if(isLoading){
                return (
                    <div style={{margin:'0 auto',width:'60px'}}>
                        <ReactLoading type={'bars'} color={'#91d5ff'} width={60}></ReactLoading>
                    </div>
                )
            } else{
                return (
                    <div className="articleChild">
                        <hr/>
                        <div className="articleItem">
                            <p>{'作者：xiaobudian'}</p>
                            <p><i style={{float: 'right',marginTop: '-33px',fontSize: '23px',color: '#91d5ff',cursor:'pointer'}} className="icon iconfont icon-cc-arrow-circle-right"></i></p>
                            <div>
                                <span className="articleItemText">{'test test test test test test test test test test'}</span>
                            </div>
                        </div>
                        <div className="articleItem">
                            <p>{'作者：xiaobudian'}</p>
                            <p><i style={{float: 'right',marginTop: '-33px',fontSize: '23px',color: '#91d5ff',cursor:'pointer'}} className="icon iconfont icon-cc-arrow-circle-right"></i></p>
                            <div>
                                <span className="articleItemText">{'test test test test test test test test test test'}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}