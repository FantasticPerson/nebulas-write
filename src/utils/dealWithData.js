import * as NebulasUtils from './nebulasUtils'

class StateManageMent{
    constructor(){
        this.state = {
            articleList:[],
            artilceItemList:[],
            commentList:[],
            thumbUpList:[],
            thumbDownList:[]
        }
        
    }
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

let stateManager = new StateManageMent()

export default stateManager