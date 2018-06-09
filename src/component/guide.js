import React, { Component } from 'react';

export default class Guide extends Component{
    render(){
        let contentStyle = {padding:'10px',position: 'fixed',top: '65px',bottom: '7px',overflowY: 'auto',width:'500px',margin:'4px auto',left:0,right:0}
        return (
            <div style={contentStyle}>
                <h1>第一步</h1>
                <h2>安装chrome钱包插件</h2>
                <h3>请从Chrome Web Store安装插件 <a href="https://chrome.google.com/webstore/detail/nasextwallet/gehjkhmhclgnkkhpfamakecfgakkfkco" target="_blank">Chrome extension</a></h3>
                <h1 style={{marginTop:'50px'}}>第二步</h1>
                <h2>创建新钱包</h2>
                <h3>打开插件并创建一个钱包</h3>
                <h1 style={{marginTop:'50px'}}>第三步</h1>
                <h2>你可以开始啦</h2>
                <h3>去展示你的才华吧!</h3>
            </div>
        )
    }
}