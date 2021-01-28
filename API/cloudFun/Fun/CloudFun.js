import callF from './call'
import Interceptor from './interceptor'
export default class CloudFun{
  // 调用前后的拦截器
  before =new Interceptor();
  after=new Interceptor();

  constructor(defaults){
    this.defaults=defaults;
  }

  call(name,data){
    // 传入的数据与defaults进行合并
    let params=this.mergeData(this.defaults,data,name);

    // 以promise形式创建，链式调用拦截器
    let callFunStart=Promise.resolve(params);

    // 执行before拦截器                     {resolve,reject} 把 use(resolve,reject)中函数取出来，然后then()链式调用
    this.before.forEach(({resolve,reject})=>{
      callFunStart=callFunStart.then(resolve,reject)
    });

    // 执行云函数
    callFunStart=callFunStart.then(callF);

    // 执行after拦截器
    this.after.forEach(({resolve,reject})=>{
      callFunStart=callFunStart.then(resolve,reject)
    });

    // 返回promise
    return callFunStart
  }

  mergeData(config,data,name){
    let params={...config};
    for(let key in data){
      if(Object.prototype.hasOwnProperty.call(params,key)){
        // config中已经有，则删掉，以data优先度为高
        delete params[key];
      }
    };
    // 合并返回
    return Object.assign(params,data,{_FunName:name});
  }
}