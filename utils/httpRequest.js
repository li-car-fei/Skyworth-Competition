import getSessionId from '../API/OldAPI/getSessionId'
const baseUrl = require('../config/index').baseUrl    // 服务器基址
const paramSession = [{},// 选择不同的header
  {'content-type': 'application/json' // 不带上session发送请求
  },
  {'content-type': 'application/x-www-form-urlencoded', // 当发送的参数要求为int时使用
  },
  {'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  {'content-type': 'application/json', // 当请求需要带上登录状态时使用
  },
  {'content-type': 'multipart/form-data; boundary=XXX', // 上传文件时使用
  }];

/**
 * 
 * @param {*} loading 请求大型数据包标志
 * @param {*} url 请求地址
 * @param {*} sessionChoose 根据数据类型选择content-type
 * @param {*} sessionId 鉴权的sessionId
 * @param {*} params 发送的数据
 * @param {*} method 请求方法
 * @param {*} authCheck 是否需要鉴权的标志
 */
function httpRequest(loading, url, sessionChoose, sessionId, params, method,authCheck=true) { // 封装统一的请求方法
  if (loading == true) {          // 加载提示
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    })
  };
    const realDeal=function() {                     // 实际处理的请求内容
      return new Promise((resolve,reject) => {
      wx.request({
        url: baseUrl + url,
        data: params,
        dataType: "json",
        header: Object.assign(paramSession[sessionChoose],{'Cookie':sessionId||wx.getStorageSync("sessionId")}),
        method: method,
        success: res => {
          console.log(res)
          if (loading == true) {
            wx.hideToast()
          };
          const status=res.statusCode
          const isHttpSuccess=status>=200&&status<300||status===304;
          if(!isHttpSuccess){       // 返回status状态有误
            reject({
              msg:`httpstatus error: ${status}`,
              detail:res
            });
            return
          }
          var cookie = res.header["Set-Cookie"] // 获取返回得到的sessionId
          if (cookie != null) {
            wx.setStorageSync("sessionId", res.header["Set-Cookie"]) // 不为空时更新sessionId
          }
          resolve(res);
        },
        fail: err => {
          console.log(err)
          if (loading == true) {
            wx.hideToast()
          }
          reject(err);
        },
        complete: () => {}
      })
    })
  };
  const httpReal=realDeal();            // 实际处理请求内容的promise
  if(authCheck){        // 需要登录状态
    if(getSessionId()){
      return httpReal
    }else{
      wx.showToast({
        title: '请先登录',
        duration: 2000
      });
      return
    }
  }else{                // 公共接口，不需登录
    return httpReal
  }
}

export default httpRequest