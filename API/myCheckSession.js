import httpRequest from '../utils/httpRequest'
function myCheckSession(callback1,callback2){ // callback2是不存在sessionId时直接运行的回调函数，可选
  let _sessionId = wx.getStorageSync('sessionId')
  let url = '/api/user/showFav/1' // 测试是否sessionId是否仍有效（登录状态有效）
  if(_sessionId){
    return httpRequest(false,url,4,_sessionId,null,'GET',false).then(res => {
      if(res.statusCode == 200){
        wx.setStorageSync('state', 1)
      }
      else{
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('sessionId')
        wx.setStorageSync('state',0)
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })
    .then(() =>{
      callback1() // 保证在使用checksession时必须先执行该函数，剩余部分放在回调函数中
    })
  }
  else{
    wx.setStorageSync('state', 0)
    if(callback2){ // 令callback2可选
      callback2() // 未登录时直接运行(sessionId不存在)
    }
  }
};

export default myCheckSession