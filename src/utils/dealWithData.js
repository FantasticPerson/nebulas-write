import * as NebulasUtils from './nebulasUtils'
import {createBrowserHistory} from 'history'

let routerHistory = createBrowserHistory()

class StateManageMent{
    constructor(){
        this.state = {
            articleList:[],
            artilceItemList:[],
            commentList:[],
            thumbUpList:[],
            thumbDownList:[],
            routerHistory:routerHistory
        }

        this.findArticleById=(id)=>{
            return this.state.articleList.find((item)=>{
                return item.id == id
            })
        }

        this.formatArticleList =(arr)=>{
            return arr.map((data)=>{
                return {
                    ...data.data,
                    hasThumbDown:data.hasThumbDown,
                    hasThumbUp:data.hasThumbUp,
                    thumbDownNum:data.thumbDownNum
                }
            })
        }

        this.mergeArr=(arr1,arr2)=>{
            let mergeArr = []
            let idArr = []
            for(let i=0;i<arr1.length;i++){
                mergeArr.push(arr1[i])
                idArr.push(arr1[i].id)
            }
            for(let i = 0;i<arr2.length;i++){
                if(idArr.indexOf(arr2[i].id) < 0){
                    mergeArr.push(arr2[i])
                }
            }
            return mergeArr
        }

        this.enterItem=(id)=>{
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
                        for(let j=0;j<item.childIds.length;i++){
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
                    console.log(res)
                    this.state.articleList = this.formatArticleList(res)
                    resolve(this.state.articleList)
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getArticleItemList = (obj,id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getArticleItemList(id).then(res=>{
                    let handledRes = this.formatArticleList(res)
                    let item = this.findArticleById(id)
                    this.state.articleList = this.mergeArr(this.state.articleList,handledRes)
                    if(item){
                        item.childIds = res.map((cItem)=>{
                            cItem.pId = id
                            return cItem.id
                        })
                        let result = this.enterItem(id)
                        resolve(result)
                    }
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getUserHistory = (obj)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getUserHistory().then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getThumbUpNum = (obj,id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getThumbUpNum(id).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getThumbDownNum = (obj,id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getThumbDownNum(id).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.getComments = (obj,id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getComments(id).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveArticle = (obj,content,title)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveArticle(content,title).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
            
        }
        this.saveArticleItem = (obj,content,title,pId)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveArticleItem(content,title,pId).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveWriteName=(obj,name)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveWriteName(name).then((res)=>{
                    obj.stateState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveThumbUp=(obj,id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveThumbUp(id).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveThumbDown=(obj,id)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveThumbDown(id).then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
        this.saveComment=(obj,id,text)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.saveComment(id,text).then((res)=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }

    }
}

/*StateManageMent.prototype.state = {
    articleList:[],
    artilceItemList:[],
    commentList:[],
    thumbUpList:[],
    thumbDownList:[],
    routerHistory:routerHistory
}


StateManageMent.prototype.getHistory = ()=>{
    console.log(this.state)
    return this.state.routerHistory
}


StateManageMent.prototype.getArticleList = ()=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.getArticles().then(res=>{
            console.log(res)
            // obj.setState({})
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
    //return NebulasUtils.getArticles()
}
StateManageMent.prototype.getArticleItemList = (obj,id)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.getArticleItemList(id).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.getUserHistory = (obj)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.getUserHistory().then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.getThumbUpNum = (obj,id)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.getThumbUpNum(id).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.getThumbDownNum = (obj,id)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.getThumbDownNum(id).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.getComments = (obj,id)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.getComments(id).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.saveArticle = (obj,content,title)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.saveArticle(content,title).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
    
}
StateManageMent.prototype.saveArticleItem = (obj,content,title,pId)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.saveArticleItem(content,title,pId).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.saveWriteName=(obj,name)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.saveWriteName(name).then((res)=>{
            obj.stateState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.saveThumbUp=(obj,id)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.saveThumbUp(id).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.saveThumbDown=(obj,id)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.saveThumbDown(id).then(res=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
StateManageMent.prototype.saveComment=(obj,id,text)=>{
    return new Promise((resolve,reject)=>{
        NebulasUtils.saveComment(id,text).then((res)=>{
            obj.setState({})
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
*/
let stateManager = new StateManageMent()

export default stateManager