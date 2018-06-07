import React, { Component } from 'react';
import ReactLoading from 'react-loading'
import {Button,Modal,Input} from 'antd'

import Comments from './comments'
import '../styles/articleItem.css'
import StateManager from '../utils/dealWithData'

export default class ArticleItem extends Component{
    constructor(){
        super()
        this.state = {isLoad:false,isLoading:false,showChildren:false,showComments:false,showModal:false}
        this.content = React.createRef()
    }

    onShowModalClick(){
        this.setState({showModal:true})
    }

    handleModalCancel(){
        this.setState({showModal:false})
    }

    handleModalOk(){
        let content = this.content.textAreaRef.value.trim()

        if(content.length == 0){
            alert("内容不能为空")
            return
        }

        // saveArticle(title,content).then((res)=>{
        //     console.log(res)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })

        this.title.input.value = ''
        this.content.input.value = ''
        this.handleModalCancel()
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

    onCommentClick(text){
        const {data} = this.props.data
        StateManager.saveComment(this,data.id,text)
    }

    onThumbUp(){
        const {data} = this.props.data
        StateManager.saveThumbUp(this,data.id)
    }

    onThumbDown(){
        const {data} = this.props.data
        StateManager.saveThumbDown(this,data.id)
    }

    render(){
        const {TextArea} = Input
        const {showChildren,showComments} = this.state
        const {data} = this.props.data
        let dropdownClass = `icon iconfont icon-downarrow ${showChildren?'':'erase'}`
        return (
            <div className="articleItem">
                <p style={{width:'700px'}}>{`作者：${data.address}`}</p>
                <div>
                    <span className="articleItemText">{data.content}</span>
                </div>
                <div className="articleItemBtns">
                    <span onClick={()=>{this.onThumbUp()}}><i style={{verticalAlign:'2px'}} className="icon iconfont icon-good"></i><i className="itemText">{'5'}</i></span>
                    <span onClick={()=>{this.onThumbDown()}}><i className="icon iconfont icon-bad"></i><i className="itemText">{'5'}</i></span>
                    <span onClick={()=>{
                        this.onShowComment()
                    }}><i className="icon iconfont icon-huifu"></i><i className="itemText">{'5'}</i></span>
                    {
                        showComments ? '' : <span onClick={()=>{this.onShowChildrenClick()}}><i style={{fontSize:'20px',float:'right'}} className={dropdownClass}></i></span>
                    }
                    <Button onClick={()=>{this.setState({showModal:true})}} type="dashed" style={{height:'30px',color:'#FFF',position: 'absolute',left: '719px',top: '15px'}}>续写</Button>
                    
                </div>
                {this.renderChildren()}
                {this.renderComments()}

                <Modal 
                    title="续写" 
                    visible={this.state.showModal}
                    onOk={this.handleModalOk.bind(this)}
                    onCancel={this.handleModalCancel.bind(this)}
                >
                    <TextArea ref={(input) => this.content = input} style={{marginTop:'20px'}} placeholder="输入内容"/>
                </Modal>
            </div>
        )
    }

    renderComments(){
        const {showComments} = this.state
        if(showComments){
            return (
                <Comments onSubmitComment={this.onCommentClick.bind(this)} onShowCommentClick={this.onShowComment.bind(this)}></Comments>
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
                const {children} = this.props.data
                let childItems = children.map((item)=>{
                    return (
                        <div className="articleItem" key={item.id}>
                            <p>{`作者：${item.address}`}</p>
                            <p><i style={{float: 'right',marginTop: '-33px',fontSize: '23px',color: '#91d5ff',cursor:'pointer'}} className="icon iconfont icon-cc-arrow-circle-right"></i></p>
                            <div>
                                <span className="articleItemText">{item.content}</span>
                            </div>
                        </div>
                    )
                })
                if(childItems.length > 0){
                    return (
                        <div className="articleChild">
                            <hr/>
                            {childItems}
                        </div>
                    )
                } else {
                    return (
                        <div style={{margin:'20px',textAlign:'center'}}>{'没有续写了，期待您的续写'}</div>
                    )
                }
            }
        }
    }
}