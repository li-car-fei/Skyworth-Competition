# Skyworth-Competition
创维竞赛信息小程序

# store 全局缓存的使用

## 初始化

在 `app.js` 中引入并且注册初始化全局缓存

```javascript
import initGlobalData from "./API/store/index";

App({
  // todo
});

// 全局挂载store 管理数据
getApp().globalData = initGlobalData(config.appName, [
  { Storage: false, description: { key: "test", data: 1 } },
]);
```

`initGlobalData` 的入参形式如下：

```bash
{
    name: '初始化store名称', // 可根据store隔离环境
    storeArray:[{
        Storage: bool,       // 是否进行小程序缓存
        description:{
            key: 'test',    // 数据key
            data: 1         // 数据data
        }
    }]
}
```

注意，`Storage:false` 的数据不会存入小程序缓存，在小程序刷新后会丢失，按需求进行设置

## set get

使用全局 store 实例进行缓存的`set`与`get`

```javascript
getApp().globalData.set(description, ...options);

// description结构：
// {
//         Storage: bool,       // 是否进行小程序缓存
//         description:{
//             key: 'test',    // 数据key
//             data: 1         // 数据data
//         }
// }

getApp().globalData.get(key);
// 根据key获取缓存数据
```

## on of

`getApp().globalData.on(key, listener)` 设置缓存数据监听器，当数据改变时，监听器依次调用
`getApp().globalData.off(key, listener)` 移除监听器

`listener` 函数的入参形式：

```bash
{
    oldData: 原来的数据,
    newData: 新设置的数据,
    ...options: 调用set时追加的参数
}
```

# router 的使用

## 初始化与配置

`/Router/PageOptions` 文件中配置页面参数

```javascript
export default [
  {
    path: "/pages/login-or-register/login-or-register", // 跳转路径，根据小程序要求的路径
    name: "login-or-register",
    meta: {
      auth: false, // 是否鉴权
    },
  },
  {
    path: "/pages/search/search",
    name: "search",
    meta: {
      auth: true,
    },
  },
];
```

`/Router/index` 文件中初始化`Router`并配置拦截器等信息

```javascript
import Router from "./myRouter/MyRouter";
import pages from "./PageOptions";

const router = new Router(pages);

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要登录权限的信息页面
    // store 中获取是否登录的信息
    const isAuth = getApp().globalData.get("isAuth");

    if (isAuth) {
      // token 验证
      next();
    } else {
      wx.showToast({
        title: "请先登录",
      });
      next(
        `/pages/login-or-register/login-or-register?redirect=${to.fullPath}` // 登录成功之后重新跳转到此页面
      );
    }
  } else {
    next();
  }
});

export default router;
```

注意：router 中的拦截器是遍历调用的，而不是链式调用，在内部通过一个标志判断是否已经执行跳转，所以拦截函数中不需要`return`

最后，在`app.js`文件中将路由器挂载到全局

```javascript
import router from "./API/Router/index";

App({
  // todo
});

// 全局挂载router
getApp().router = router;
```

## navigate

navigate 可传参数是跳转路径与 query

```javascript
getApp().router.navigate('/pages/competition/competition',{
    name:'carfied,
    age:18
})
```

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

# 云数据库操作

## 字段格式与初始化

为避免造成对数据的污染，在`/cloudBase/Models` 中根据数据表的名字建立 js 文件描述字段

注意：文件名必须和云端数据库表名一致！！！

然后，根据需要在页面引用，或者另外设计成单例的形式再暴露接口即可
