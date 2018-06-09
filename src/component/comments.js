import React, { Component } from 'react';
import { Input,Button } from 'antd';
import '../styles/comments.css'
import StateManager from '../utils/stateManager'

class Comments extends Component{
    constructor(){
        super()
        this.input = React.createRef()
    }
    onHideComments(){
        const {onShowCommentClick} = this.props;
        onShowCommentClick(true)
    }

    componentDidMount(){

    }

    onCommentClick(){
        let value = this.input.input.value.trim()
        if(value.length > 0){
            const {onSubmitComment} = this.props
            onSubmitComment(value)
        }
    }

    render(){
        return (
            <div className="commentContainer">
                <Button onClick={()=>{this.onHideComments()}} type="primary" style={{float:'right',marginTop:'-10px'}}>收起</Button>
                {this.renderComments()}
                <div>
                    <Input ref={(input)=>{this.input=input}} placeholder="回复内容" style={{width: '650px',marginRight: '20px'}}/>
                    <Button type="primary" onClick={this.onCommentClick.bind(this)}>评论</Button>
                </div>
            </div>
        )
    }

    renderComments(){
        const {data} = this.props
        if(data.length > 0){
            return (
                <div>
                    {
                        data.map((item)=>{
                            return (
                                <div className="commentItem" key={item.timestamp}>
                                    <div>{`作者:${item.name}`}</div>
                                    <p>{item.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>{`暂无回复!`}</div>
            )
        }
    }
}

export default Comments