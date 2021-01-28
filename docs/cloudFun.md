# cloudFun 使用

## cloudFun 初始化

`/cloudFun/init.js` 是小程序启动云开发的方法，需要注入到`app.js`中

`/cloudFun/cloudFun.js` 初始化配置，类似于 axios 的配置方法，设置拦截器并暴露出去

```javascript
import cloudFun from "./Fun/index";
import { getAuth, checkAuth } from "./checkAuth";

const instance = cloudFun.create({ a: 1, b: 1 });

instance.before.use((params) => {
  if (params.showLoading) {
    const loadingText =
      typeof params.showLoading === "string" ? params.showLoading : "加载中";
    wx.showLoading({
      title: loadingText,
    });
    delete params.showLoading;
  }
  return params;
});

instance.after.use((res) => {
  wx.hideLoading({});
  return res;
});

export default instance;
```

再在`app.js`中绑定到全局中

```javascript
import init from "./API/cloudFun/init";
import cloudFun from "./API/cloudFun/cloudFun";
App({
  onLaunch: function () {
    // 云初始
    init();

    // todo
  },
});

// 全局挂载cloudFun
getApp().cloudFun = cloudFun;
```

## 使用

在使用时配合拦截器进行逻辑分离，比如进行

- 登录检测验证
- 默认参数的注入
- 错误统一拦截处理

和云端云函数配合，可以在无状态的云函数调用中加入我们需要的‘状态’

调用方式：

```javascript
getApp().cloudFun.call(name, data);
// string:name: 函数名
// object:data：数据
```

由于 `/cloudFun/Fun/index.js` 中进行了实例接口封装，因此也可以直接引入此文件暴漏的接口进行调用，但注意此接口是没有配置过默认参数和拦截器的

```javascript
import cloudFun from "../cloudFun/Fun/index";

cloudFun.call(name, data); // 参数解析如上
```

## Interceptor

`instance.before.use` 和 `instance.after.use` 中传入的是 Promise 链式调用的函数，即 `.then(res=>{},err=>{})` 两个函数

在调用云函数时是链式调用的形式，拦截器依次执行并返回处理结果，因此`res`和`err`是原始出入参或者上一步拦截器处理过后的参数，需要关注拦截器注入的顺序

链式调用关键步骤

```javascript
// 以promise形式创建，链式调用拦截器
let callFunStart = Promise.resolve(params);

// 执行before拦截器                     {resolve,reject} 把 use(resolve,reject)中函数取出来，然后then()链式调用
this.before.forEach(({ resolve, reject }) => {
  callFunStart = callFunStart.then(resolve, reject);
});

// 执行云函数
callFunStart = callFunStart.then(callF);

// 执行after拦截器
this.after.forEach(({ resolve, reject }) => {
  callFunStart = callFunStart.then(resolve, reject);
});
```

## auth

`/cloudFun/checkAuth.js` 中暴露检测 auth 状态的函数

- `getAuth` : 检测授权情况，未授权则申请授权，并存缓存
- `checkAuth` : 从缓存看是否已经授权
- `getUserInfo` : 从缓存获取用户信息
