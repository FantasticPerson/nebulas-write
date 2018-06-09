'use strict';

var Article = function(text){
    if(text){
        var obj = JSON.parse(text)
        this.address = obj.address
        this.content = obj.content
        this.timestamp = obj.timestamp
        this.id = obj.id
        this.title = obj.title
    } else {
        this.address = ''
        this.content = ''
        this.timestamp = Blockchain.transaction.timestamp
        this.id = ''
        this.title = ''
    }
}

Article.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var Comment = function(text){
    if(text){
        var obj = JSON.parse(text)
        this.address = obj.address
        this.articleId = obj.articleId
        this.content = obj.content
        this.timestamp = obj.timestamp
    } else {
        this.address = ''
        this.articleId = ''
        this.content = ''
        this.timestamp = Blockchain.transaction.timestamp
    }
}
Comment.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var naviteConfig = {
    stringify:function(obj){
        return obj
    },
    parse:function(str){
        return str
    }
}

var CoWriteContract = function(){
    LocalContractStorage.defineMapProperty(this,'articles',{
        stringify:function(obj){
            return obj.toString()
        },
        parse:function(str){
            return new Article(str);
        }
    })
    LocalContractStorage.defineMapProperty(this,'comments',{
        stringify:function(obj){
            return obj.toString()
        },
        parse:function(str){
            return new Comment(str);
        }
    })

    LocalContractStorage.defineMapProperty(this,'articleCommentIds',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'userHistories',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'names',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'articleIds',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'articleChildIds',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'articleComments',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'articleThumbUps',naviteConfig)
    LocalContractStorage.defineMapProperty(this,'articleThumbDowns',naviteConfig)
    LocalContractStorage.defineProperties(this,{
        "articleMaxId":null,
        "articleItemMaxIds":null,
        "commentMaxId":null,
        "articleSize":null
    })
}

CoWriteContract.prototype = {
    init:function(){
        this.articleMaxId = 0
        this.articleItemMaxIds = "0"
        this.commentMaxId = 0
        this.articleSize = 0
    },

    saveArticle:function(type,content,title,pId){
        var address = Blockchain.transaction.from
        var id = this._getMaxArticleId(type == 'article' ? -1 : pId)
        
        var newItem = new Article()

        newItem.address = address
        newItem.content = content
        newItem.id = id
        newItem.title = title

        if(type == "article"){
            this.articleSize = parseInt(id)
        }

        this.articles.set(id,newItem)

        this._saveUserHistory(address,id)

        if(type == 'articleItem'){
            this._saveChildId(pId,id)
        }
    },

    savaWriteName(name){
        var address = Blockchain.transaction.from;
        
        this.names.set(address,name)
    },

    saveThumbUp:function(id){
        var address = Blockchain.transaction.from;
        if(this.articles.get(id)){
            var thumbUpItem = this.articleThumbUps.get(id)
            if(!thumbUpItem){
                thumbUpItem = ''
            }
            var index = this._getIdIndexInStr(thumbUpItem,address)
            if(index >= 0){
                thumbUpItem = this._deleteIdFromStr(thumbUpItem,index)
            } else {
                thumbUpItem = this._addIdToString(thumbUpItem,address)
            }
            this.articleThumbUps.set(id,thumbUpItem)
        }
    },
    
    saveThumbDown:function(id){
        var address = Blockchain.transaction.from;
        if(this.articles.get(id)){
            var thumbDownItem = this.articleThumbDowns.get(id)
            if(!thumbDownItem){
                thumbDownItem = ''
            }
            var index = this._getIdIndexInStr(thumbDownItem,address)
            if(index >= 0){
                thumbDownItem = this._deleteIdFromStr(thumbDownItem,index)
            } else {
                thumbDownItem = this._addIdToString(thumbDownItem,address)
            }
            this.articleThumbDowns.set(id,thumbDownItem)
        }
    },

    saveComment:function(id,text){
        this.commentMaxId = parseInt(this.commentMaxId) + 1
        var cId = this.commentMaxId
        var address = Blockchain.transaction.from;
        var articleCommentIds = this.articleComments.get(id)
        if(!articleCommentIds){
            articleCommentIds = ''
        }
        articleCommentIds = this._addIdToString(articleCommentIds,cId)
        this.articleComments.set(id,articleCommentIds)

        var comment = new Comment()
        comment.address = address
        comment.content = text
        comment.articleId = id
        
        this.comments.set(cId,comment)
    },

    getArticleList:function(type,id){
        if(type == 'article' || type == 'articleItem'){
            var articleArr = []
            var ids = []
            if(type == 'article'){
                for(var i=0;i<parseInt(this.articleSize);i++){
                    ids.push(i+1)
                } 
            } else {
                var childIds = this.articleChildIds.get(id)
                if(childIds){
                    var ids = childIds.split(',')
                }
            }
            for(var i=0;i<ids.length;i++){
                var item = this._getArticleDdata(ids[i])
                if(item){
                    articleArr.push(item)
                }
            }
            
            return articleArr
        } else {
            throw new Error('type is not defined')
        }
    },

    getArticleDataById(id){
        return this._getArticleDdata(id)
    },

    getUserHistory:function(){
        var articleArr = []
        var address = Blockchain.transaction.from;
        var userHistory = this.userHistories.get(address)
        if(userHistory){
            var ids = userHistory.split(',')
            for(var i=0;i<ids.length;i++){
                var item = this._getArticleDdata(ids[i])
                if(item){
                    articleArr.push(item)
                }
            }
        }
        return articleArr
    },

    getThumbUpNum:function(id){
        var thumbUpItem = this.articleThumbUps.get(id)
        if(thumbUpItem){
            return {'num':thumbUpItem.split(',').length}
        }
        return {'num':0}
    },

    getThumbDownNum:function(id){
        var thumbDownItem = this.articleThumbDowns.get(id)
        if(thumbDownItem){
            return {'num':thumbDownItem.split(',').length}
        }
        return {'num':0}
    },

    getComments:function(id){
        var commentItem = this.articleComments.get(id)
        var comments = []
        if(commentItem){
            var ids = commentItem.split(',')
            for(var i=0;i<ids.length;i++){
                var cItem = this.comments.get(ids[i])
                if(cItem){
                    var name = this.names.get(cItem.address)
                    if(name){
                        cItem.name = name
                    } else {
                        cItem.name = cItem.address
                    }
                    comments.push(cItem)
                }
            }
        }
        return comments
    },

    _getArticleDdata:function(id){
        var item = this.articles.get(id)
        if(item){
            var thumbDownNum = this.getThumbDownNum(id).num
            var thumbUpNum = this.getThumbUpNum(id).num
            var comments = this.getComments(id)
            var hasThumbUp = this._checkIsThumbUp(id)
            var hasThumbDown = this._checkIsThumbDown(id) 

            return {"data":item,"thumbUpNum":thumbUpNum,"thumbDownNum":thumbDownNum,"hasThumbUp":hasThumbUp,"hasThumbDown":hasThumbDown,'comments':comments}
        }
        return null
    },

    _getMaxArticleId:function(pid){
        var maxIdsArr = this.articleItemMaxIds.split('-')
        var level = 0
        if(parseInt(pid) != -1){
            level = (pid+'').split('-').length
        }
        var id = maxIdsArr[level]
        if(id == undefined ){
            id = 1
        } else {
            id = parseInt(id)+1
        }
        maxIdsArr[level] = id
        this.articleItemMaxIds = maxIdsArr.join('-')
        if(pid == -1){
            return id
        }
        return pid+'-'+id
    },

    _addIdToString:function(str,id){
        if(str.length == 0){
            return id+''
        } else {
            var arr = str.split(',')
            arr.push(id)

            return arr.join(',')
        }
    },

    _getIdIndexInStr:function(str,id){
        var arr = str.split(',')
        return arr.indexOf(id+'')
    },

    _deleteIdFromStr:function(str,index){
        var arr = str.split(',')
        arr.split(index,1)
        return arr.join(',')
    },

    _saveChildId:function(pid,id){
        var ids = this.articleChildIds.get(pid)
        if(!ids){
            ids = ''
        }
        ids = this._addIdToString(ids,id)
        this.articleChildIds.set(pid,ids)
    },

    _saveUserHistory(address,id){
        var userHistoryItem = this.userHistories.get(address)
        if(!userHistoryItem){
            userHistoryItem = ''
        }
        userHistoryItem = this._addIdToString(userHistoryItem,id)
        this.userHistories.set(address,userHistoryItem)
    },
    _checkIsThumbUp(id){
        var address = Blockchain.transaction.from;
        var thumUpItem = this.articleThumbUps.get(id)
        if(thumUpItem){
            var index = this._getIdIndexInStr(thumUpItem,address)
            return index >= 0
        }
        return false
    },
    _checkIsThumbDown(id){
        var address = Blockchain.transaction.from;
        var thumDownItem = this.articleThumbDowns.get(id)
        if(thumDownItem){
            var index = this._getIdIndexInStr(thumDownItem,address)
            return index >= 0
        }
        return false
    }
}

module.exports = CoWriteContract;