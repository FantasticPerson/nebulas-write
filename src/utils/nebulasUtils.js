let Nebulas = require('nebulas')
let NebPay = require('nebpay')

let nebPay = new NebPay()
let Neb = Nebulas.Neb
var Account = Nebulas.Account;

let neb = new Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io"))

const dappAddress = "n213gA7GR7wsnGuVjvjTWxTXcuAttfb4dtx"

function doSaveRequest(callFunction,callArgs,functionName){
    let to = dappAddress;
    let value = "0";
    let tryTimes = 0
    return new Promise((resolve,reject)=>{
        nebPay.call(to,value,callFunction,callArgs,{
            listener:(resp)=>{
                let intervalQuery = setInterval(()=>{
                    tryTimes++;
                    neb.api.getTransactionReceipt({hash: resp["txhash"]})
                    .then((receipt)=>{
                        if(receipt["status"] == 2){
                            console.info(`${functionName} pending......`)
                        } else if(receipt["status"] == 1){
                            clearInterval(intervalQuery)
                            console.info(`${functionName} sucess......`)
                            resolve({'tryTimes':tryTimes})
                        } else {
                            clearInterval(intervalQuery)
                            console.error(`${functionName} save fail.....`)
                            reject('failure')
                        }
                    })
                    .catch(err=>{
                        clearInterval(intervalQuery)
                        console.error(`${functionName} ${JSON.parse(err)}`)
                        reject(err)
                    })
                },5000)
            }
        })
    })
}

function doGetRequest(callFunction,callArgs,functionName){
    let to = dappAddress;
    let value = "0";
    return new Promise((resolve,reject)=>{
        nebPay.simulateCall(to,value,callFunction,callArgs,{
            listener:(res)=>{
                try{
                    let result = res.result
                    if(result){
                        let obj = JSON.parse(result)
                        console.info(`${functionName} ${res.result}`)
                        resolve(obj)
                    } else {
                        reject()
                    }
                } catch(e){
                    console.error(`${functionName} ${JSON.parse(e)}`)
                    reject(e)
                }
            }
        })
    })
}

export function getArticles(){
    let callFunction = "getArticleList";
    let callArgs = `["article","-1"]`;
    return doGetRequest(callFunction,callArgs,'getArticles')
}

export function getArticleItemList(id){
    let callFunction = "getArticleList";
    let callArgs = `["articleItem","${id}"]`;
    return doGetRequest(callFunction,callArgs,`getArticleItemList-${id}`)
}

export function getUserHistory(){
    let callFunction = "getUserHistory";
    let callArgs = `[]`;
    return doGetRequest(callFunction,callArgs)
}

export function getThumbUpNum(id){
    let callFunction = "getThumbUpNum";
    let callArgs = `["${id}"]`;
    return doGetRequest(callFunction,callArgs,`getThumbUpNum-${id}`)
}

export function getThumbDownNum(id){
    let callFunction = "getThumbDownNum";
    let callArgs = `["${id}"]`;
    return doGetRequest(callFunction,callArgs,`getThumbDownNum-${id}`)
}

export function getComments(id){
    let callFunction = "getComments";
    let callArgs = `["${id}"]`;
    return doGetRequest(callFunction,callArgs)
}

export function saveArticle(content,title){
    let callFunction = "saveArticle";
    let callArgs = `["article","${content}","${title}","-1"]`;
    return doSaveRequest(callFunction,callArgs,`saveArticle`)
}

export function saveArticleItem(content,title,pId){
    let callFunction = "saveArticle";
    let callArgs = `["articleItem","${content}","${title}","${pId}"]`;
    return doSaveRequest(callFunction,callArgs,`saveArticleItem-${pId}`)
}

export function saveWriteName(name){
    let callFunction = "savaWriteName";
    let callArgs = `["${name}"]`;
    return doSaveRequest(callFunction,callArgs,`saveWriteName-${name}`)
}

export function saveThumbUp(id){
    let callFunction = "saveThumbUp";
    let callArgs = `["${id}"]`;
    return doSaveRequest(callFunction,callArgs,`saveThumbUp-${id}`)
}

export function saveThumbDown(id){
    let callFunction = "saveThumbDown";
    let callArgs = `["${id}"]`;
    return doSaveRequest(callFunction,callArgs,`saveThumbDown-${id}`)
}

export function saveComment(id,text){
    let callFunction = "saveComment";
    let callArgs = `["${id}","${text}"]`;
    return doSaveRequest(callFunction,callArgs,`saveComment-${id}-${text}`)
}

