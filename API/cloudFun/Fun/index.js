import CloudFun from './CloudFun'

// 创建实例，暴露到外部接口
function createInstance(defaults = {}) {                       // 返回一个没有defaults的实例，使得接口可以直接调用函数
  // 创建CloudFun实例
  const instance = new CloudFun(defaults);

  // 默认触发云函数的方法，直接调用
  function cloudFun(name, data) {
    return instance.call(name, data);                          // 实例直接执行call调用云函数
  }

  // 合并实例属性
  Object.assign(cloudFun, instance)
  // 设置cloudFun原型，合并实例方法
  Object.setPrototypeOf(cloudFun, Object.getPrototypeOf(instance))

  return cloudFun
}

// 默认cloudFun实例，通过上方封装可以直接调用callfun
const cloudFun = createInstance({});

// create接口
cloudFun.create = function create(defaults) {                    // 赋予create方法，增加defaults，新建实例并返回
  return createInstance(defaults)
}

export default cloudFun