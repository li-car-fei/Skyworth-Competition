export default class Hook{
  // private id
  _beforeId=0
  _afterId=0

  // private 拦截器集合
  _beforeInterceptors=new Map()
  _afterInterceptors=new Map()

  beforeEach=function(fun){
    this._beforeInterceptors.set(++this._beforeId,fun);
    return this._beforeId
  }

  afterEach=function(fun){
    this._afterInterceptors.set(++this._afterId,fun);
    return this._afterId
  }

  // 遍历拦截器执行
  forEach(executor,type){
    if(type=='before'){
      this._beforeInterceptors.forEach(executor)
    }else if(type=='after'){
      this._afterInterceptors.forEach(executor);
    }else{
      return
    }
  }
}