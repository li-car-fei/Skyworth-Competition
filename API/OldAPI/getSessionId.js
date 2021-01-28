import myCheckSession from './myCheckSession'
let isGettingId=false

function getSessionId(){
  try{
    if(!isGettingId){                             // 避免多次获取
      myCheckSession(function(){
        let state = wx.getStorageSync('state')    // 登录状态,是否过期
        isGettingId=true;
        if(state){
          return wx.getStorageSync('sessionId')
        }else{                                    // 登录过期
          return false
        }
      })
    }
  }catch(err){
    console.log(err);
    return Promise.reject(err)
  }
}

export default getSessionId