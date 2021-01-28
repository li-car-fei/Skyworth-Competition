const baseUrl = require('../../config/index').baseUrl
function switchIcon(params){
  return new Promise((resolve,reject) => {
    wx.uploadFile({
      url: baseUrl + params.username, 
      filePath: params.imagePath,
      name: 'avatarImage',
      header:{
        'Cookie': wx.getStorageSync('sessionId')
      },
      formData: {},
      success: res => {
        resolve(res)
      },
      fail: res =>{
        reject(res)
        console.log(res)
      }
    })
  })
}

export default switchIcon