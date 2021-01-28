import Router from './myRouter/MyRouter'
import pages from './PageOptions'

const router =new Router(pages);

router.beforeEach((to,from,next)=>{
  if (to.meta.auth) {   // 需要登录权限的信息页面
    // store 中获取是否登录的信息
    const isAuth=getApp().globalData.get('isAuth');

    if (isAuth) {            // token 验证
      next();
    } else {
      wx.showToast({
        title: '请先登录',
      })
      next(
         `/pages/login-or-register/login-or-register?redirect=${to.fullPath}`   // 登录成功之后重新跳转到此页面
      )
    }
  } else {
    next();
  }
})

export default router