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
