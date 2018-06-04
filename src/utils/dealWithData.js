import * as NebulasUtils from './nebulasUtils'

export class StateManageMent{
    constructor(state){
        this.state = {
            articleList:[],
            artilceItemList:[],
            commentList:[],
            thumbUpList:[],
            thumbDownList:[]
        }
        this.getArticleList = (obj)=>{
            return new Promise((resolve,reject)=>{
                NebulasUtils.getArticles().then(res=>{
                    obj.setState({})
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
            return NebulasUtils.getArticles()
        }
        this.getArticleItemList = (obj,id)=>{
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
        this.saveComment=(id,text)=>{
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