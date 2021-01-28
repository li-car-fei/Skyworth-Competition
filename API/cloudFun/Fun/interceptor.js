export default class InterceptorManager{
  // private id
  _id=0

  // private 拦截器集合
  _interceptors=new Map()

  // 添加新的拦截器
  use(resolve,reject){
    this._interceptors.set(++this._id,{
      resolve,
      reject
    })
    return this._id
  }

  // 移除拦截器
  remove(id){
    return this._interceptors.delete(id)
  }

  // 遍历拦截器并执行
  forEach(executor){
    this._interceptors.forEach(executor)
  }
}