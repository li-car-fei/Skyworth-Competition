const DB=wx.cloud.database()
const _=DB.command;

import CompareKeys from './baseUntils/CompareKeys'

// 连接collection并封装增删改查操作
class Collection{
  constructor(name){   
    this.collection=DB.collection(name);
    this.modelDes=require(`./Models/${name}`).default
  }

  add(data){      // 增加一条数据
    if(!CompareKeys(data,this.modelDes)){
      return Promise.reject('add keys error')
    }else{
      return this.collection.add({
        data
      })              // 返回promise
    }           
  }

  get(where){     // 获取满足条件的数据
    return this.collection.where({
      ...where
    }).get()
  }

  getlimit(skipIndex,limitIndex){
    return this.collection.skip(skipIndex).limit(limitIndex).get()
  }

  getchooselimit(where,skipIndex,limitIndex){
    return this.collection.where({
      ...where
    }).skip(skipIndex).limit(limitIndex).get()
  }

  update(where,data){
    if(!CompareKeys(data,this.modelDes)){
      return Promise.reject('add keys error')
    }else{
      return this.collection.where({
        ...where
      }).update({
        data
      })
    }
  }

  remove(where){
    return this.collection.where({
      ...where
    }).remove()
  }
}

module.exports={
  Collection,
  _
}