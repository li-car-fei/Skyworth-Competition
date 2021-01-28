import httpRequest from '../../utils/httpRequest'
import myCheckSession from './myCheckSession'
function login(username,password){ // 登录
  let loginUrl = '/api/auth/login'
  let loginParams = {
    username: username,
    password: password
  }
  return httpRequest(true,loginUrl,1,wx.getStorageSync('sessionId'),loginParams,'POST',false).then(res => {
    if(res.data.status == 200){
      wx.showToast({
        title: '登录成功',
        icon:'success',
        duration: 2000
      })
      try {
        wx.setStorageSync('userInfo', res.data.userInfo)
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      } catch (err) {
        console.log(err)
       }
    }
    else{
      wx.showToast({
        title: res.data.message,
        icon:'none',
        duration: 2000
      })
    }
  })
}

function logout(){ // 登出
  let url = '/api/auth/logout'
  myCheckSession(() => {
    if(wx.getStorageSync('state') == 1){
      return httpRequest(true,url,4,wx.getStorageSync('sessionId'),null,'GET',false).then(() => {
        wx.removeStorageSync('sessionId')
        wx.removeStorageSync('userInfo')
      })
    }
    else{
      console.log("未在登陆状态")
    }
  })
}

function myGetUserInfo(){
  let url = '/api/user/info'
  return httpRequest(false, url, 4, wx.getStorageSync('sessionId'), null, 'GET')
}

module.exports = {
  login: login,
  logout: logout,
  myGetUserInfo: myGetUserInfo
}