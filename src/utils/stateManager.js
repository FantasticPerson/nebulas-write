import * as NebulasUtils from './nebulasUtils'
import {createBrowserHistory} from 'history'
import eventBus from './eventBus'

let routerHistory = createBrowserHistory()

class StateManageMent{
    constructor(){
        this.state = {
            articleList:[],
            artilceItemList:[],
            commentList:[],
            thumbUpList:[],
            thumbDownList:[],
            routerHistory:routerHistory,
            articleId:null
        }

        this.resetState = ()=>{
            this.state.articleList=[]
            this.state.artilceItemList=[]
            this.state.commentList=[]
            this.state.thumbUpList=[]
            this.state.thumbDownList=[]
        }

        this.prefix = '/nebulaecowriter'

        this.routerPush=(path)=>{
            
            this.state.routerHistory.push(`${this.prefix}${path}`)
        }

        this.getPrefix=()=>{
            return this.prefix
        }

        this.setArticleId =(id)=>{
            this.state.articleId = id
        }

        this.getArticleId = ()=>{
            return this.state.articleId
        }

        this.findArticleById=(id)=>{
            return this.state.articleList.find((item)=>{
                return item.id == id
            })
        }

        this.formatArticleList =(arrw)=>{
            let arr = arrw || []
            return arr.map((data)=>{
                return {
                    ...data.data,
                    comments:data.comments,
                    hasThumbDown:data.hasThumbDown,
                    hasThumbUp:data.hasThumbUp,
                    thumbDownNum:data.thumbDownNum,
                    thumbUpNum:data.thumbUpNum
                }
            })
        }

        this.mergeArr=(arr1,arr2)=>{
            let mergeArr = []
            for(let i=0;i<arr1.length;i++){
                let item = arr2.find((item)=>{
                    return item.id == arr1[i].id
                })
                if(item){
                    mergeArr.push(item)
                } else {
                    mergeArr.push(arr1[i])
                }
            }
            for(let j=0;j<arr2.length;j++){
                let item = mergeArr.find((item)=>{
                    return item.id == arr2[j].id
                })
                if(!item){
                    mergeArr.push(arr2[j])
                }
            }
            return mergeArr
        }

        this.enterItem=(id2)=>{
            let id = String(this.state.articleId)
            let itemArr = []
            let ids = id.split('-')
            let res = []
            for(let i = 0;i<ids.length;i++){
                let tId = ids.slice(0,i+1).join('-')
                let item = this.findArticleById(tId)
                
                if(item){
                    let obj = {data:item}
                    if(item.childIds){
                        let children = []
                        for(let j=0;j<item.childIds.length;j++){
                            let cItem = this.findArticleById(item.childIds[j])
                            if(cItem){
                                children.push(cItem)
                            }
                        }
                        obj.children = children
                    }
                    res.push(obj)
                }
            }
            console.log(res)
            return res
        }

        this.getHistory = ()=>{
            console.log(this.state)
            return this.state.routerHistory
        }
        
        
        this.getArticleList = ()=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getArticles().then(res=>{
                    this.resetState()
                    this.state.articleList = this.formatArticleList(res)
                    console.log(this.state.articleList)
                    resolve(this.state.articleList)
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }

        this.updateArticleById = (id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getArticleById(id).then(res=>{
                    let item = this.findArticleById(id)
                    if(item){
                        item.comments=res.comments,
                        item.hasThumbDown=res.hasThumbDown,
                        item.hasThumbUp=res.hasThumbUp,
                        item.thumbDownNum=res.thumbDownNum,
                        item.thumbUpNum=res.thumbUpNum

                        console.log(item)
                        resolve()
                    }
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }

        this.getArticleItemList = ()=>{
            let id = this.state.articleId
            console.log('getArticleItemList：'+id)
            return new Promise((resolve,reject)=>{
                NebulasUtils.getArticleItemList(id).then(res=>{
                    let handledRes = this.formatArticleList(res)
                    console.log(handledRes)
                    let item = this.findArticleById(id)
                    this.state.articleList = this.mergeArr(this.state.articleList,handledRes)
                    if(item){
                        item.childIds = handledRes.map((cItem)=>{
                            cItem.pId = id
                            return cItem.id
                        })
                        resolve()
                    }
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getUserHistory = ()=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getUserHistory().then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getThumbUpNum = (id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getThumbUpNum(id).then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getThumbDownNum = (id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getThumbDownNum(id).then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getComments = (id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getComments(id).then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveArticle = (content,title)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveArticle(content,title).then(res=>{
                    
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
            
        }
        this.saveArticleItem = (content,title,pId)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveArticleItem(content,title,pId).then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveWriteName=(name)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveWriteName(name).then((res)=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveThumbUp=(id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveThumbUp(id).then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveThumbDown=(id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveThumbDown(id).then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveComment=(id,text)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveComment(id,text).then((res)=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }

    }
}

let stateManager = new StateManageMent()

export default stateManager