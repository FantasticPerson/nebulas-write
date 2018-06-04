import React, { Component } from 'react';
import { Input,Button } from 'antd';
import '../styles/comments.css'

class Comments extends Component{
    onHideComments(){
        const {onShowCommentClick} = this.props;
        onShowCommentClick(true)
    }

    render(){
        return (
            <div className="commentContainer">
                <Button onClick={()=>{this.onHideComments()}} type="primary" style={{float:'right',marginTop:'-10px'}}>收起</Button>
                <div className="commentItem">
                    <div>小三哥</div>
                    <p>哥们儿 有意思啊！再来</p>
                </div>
                <div className="commentItem">
                    <div>小三哥</div>
                    <p>哥们儿 有意思啊！再来</p>
                </div>
                <div className="commentItem">
                    <div>小三哥</div>
                    <p>哥们儿 有意思啊！再来</p>
                </div>
                <div className="commentItem">
                    <div>小三哥</div>
                    <p>哥们儿 有意思啊！再来</p>
                </div>
                <div className="commentItem">
                    <div>小三哥</div>
                    <p>哥们儿 有意思啊！再来</p>
                </div>
                <div className="commentItem">
                    <div>小三哥</div>
                    <p>哥们儿 有意思啊！再来</p>
                </div>
                <div>
                    <Input placeholder="回复内容" style={{width: '650px',marginRight: '20px'}}/>
                    <Button type="primary">评论</Button>
                </div>
            </div>
        )
    }
}

export default Comments