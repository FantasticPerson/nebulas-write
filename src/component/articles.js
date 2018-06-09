import React, { Component } from 'react';
import { Layout,Button,Pagination,Modal,Input  } from 'antd';

import Article from './article'
import {getArticles,saveArticle} from '../utils/nebulasUtils'
import ReactLoading from 'react-loading'
import StateManager from '../utils/stateManager'

class Articles extends Component{
    constructor(){
        super()
        this.state={articleList:null,showModal:false}
        this.title=React.createRef()
        this.content = React.createRef()
    }

    componentDidMount(){
        this._isMounted = true

        StateManager.getArticleList().then(res=>{
            if(this._isMounted){
                this.setState({articleList:res})
            }
        })
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    onShowModalClick(){
        this.setState({showModal:true})
    }

    handleModalOk(){
        let title = this.title.input.value.trim()
        let content = this.title.input.value.trim()

        if(title.length == 0 || content.length == 0){
            alert("标题或内容为空")
            return
        }

        StateManager.saveArticle(content,title).then(()=>{
            StateManager.getArticleList().then(res=>{
                if(this._isMounted){
                    this.setState({articleList:res})
                }
            })
        })
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

    handleModalCancel(){
        this.setState({showModal:false})
    }

    render(){
        const {isLoading,articleList} = this.state
        let contentStyle = {padding:'10px',position: 'fixed',top: '65px',bottom: '7px',overflowY: 'auto',width:'930px',margin:'4px auto',left:0,right:0}
        if(articleList){
            const {articleClick} = this.props
            let articleListArr = articleList.map(item=>{
                return <Article articleClick={articleClick} data={item} key={item.id}></Article>
            })
            return (
                <div style={contentStyle}>
                    <Button type="primary" style={{margin:'10px'}} onClick={this.onShowModalClick.bind(this)}>新建文章</Button>
                    <div style={{...contentStyle,top:'120px'}}>
                        {articleListArr}
                    </div>
                    <Modal 
                        title="新建文章" 
                        visible={this.state.showModal}
                        onOk={this.handleModalOk.bind(this)}
                        onCancel={this.handleModalCancel.bind(this)}
                    >
                        <Input ref={(input) => this.title = input} placeholder="输入文章标题"/>
                        <Input ref={(input) => this.content = input} style={{marginTop:'20px'}} placeholder="输入第一段内容"/>
                    </Modal>
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