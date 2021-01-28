//  // 登录
//   wx.login({
//     success: res => {
//       // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       //console.log(res)
//     }
//   })

//获取用户信息
// wx.getSetting({
//   success: res => {
//     //console.log(res)
//     if (res.authSetting['scope.userInfo']) {
//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//       wx.getUserInfo({
//         success: res => {
//           console.log(res)
//         },
//         fail:err=>{
//           console.log(err)
//         }
//         })
//     }else{
//       wx.getUserInfo({
//         success:res=>{
//           console.log(res)
//       }
//       })
//     }
//   }
// })

import wxPromise from '../../utils/wxPromise'
//const app=getApp()

function getAuth() {                // 检测授权情况并且存缓存
  const app = getApp()
  return wxPromise('getSetting')().then(res => {
    if (res.authSetting['scope.userInfo']) {
      return wxPromise('getUserInfo')()
    }
  }).then(res => {
    //console.log(app.globalData)
    app.globalData.set({ Storage: true, description: { key: "userInfo", data: res.userInfo } });
    app.globalData.set({ Storage: true, description: { key: "isAuth", data: true } });
    app.globalData.on('isAuth', () => {
      wx.showModal({
        cancelColor: '退出登录',
      })
    })
    return new Promise(resolve => resolve(res.userInfo))
  })
}

function checkAuth() {
  const app = getApp()
  const isAuth = app.globalData.get('isAuth');
  return isAuth || false
}

function getUserInfo() {
  const app = getApp()
  const isAuth = checkAuth();
  if (isAuth) {
    return app.globalData.get('userInfo');
  } else {
    return undefined
  }
}

export {
  getAuth,
  checkAuth,
  getUserInfo
}
