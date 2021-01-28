//import myCheckSession from '../../API/myCheckSession'
//const getValNum2 = require('../../API/resetPassword').getValNum2
//const resetPassword = require('../../API/resetPassword').resetPassword
//const login = require('../../API/login').login
const {checkEmail}=require('../../utils/utils');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGettingValidNumber: false, // 是否正在获取验证码
    sendMg: '获取验证码', // 按钮上显示的文本
    countDownTime: 60 // 倒计时为60s
  },
  getValidNumber: function (e) { // 获取验证码
    let _email = this.data.newEmail
    let that = this
    // if (_email == undefined) {
    //   //return false;
    //   _email='1073490398@qq.com'          // 暂无邮箱  ！！！
    // }
    if(checkEmail(_email)){
      wx.cloud.callFunction({
        name:'mail',data:{
          email:_email,
          choose:'send'
        }
      }).then(res=>{
        console.log(res);
        if(res.result.bool){
          that.getCountDown();
        }
      })
    }else{
      wx.showModal({
        cancelColor: '邮箱格式错误',
      })
    }
    
  },
  getCountDown: function () { //验证码一分钟倒计时
    let time = this.data.countDownTime;
    let that = this;
    let _sendMg;
    if (time <= 0) { // 倒计时结束
      that.setData({
        isGettingValidNumber: false,
        sendMg: "获取验证码",
        countDownTime: 60
      })
      return false;
    }
    that.setData({
      isGettingValidNumber: true
    })
    time = parseInt(time) - 1;
    _sendMg = "重新获取(" + time + ")s"
    that.setData({
      sendMg: _sendMg,
      countDownTime: time
    })
    setTimeout(this.getCountDown, 1000)
  },
//   checkInfo: function () { // 检查输入信息是否合法
//     let _password = this.data.password
//     let _repeatPassword = this.data.repeatPassword
//     let _validNumber = this.data.validNumber
//     if (_validNumber) {
//       if (_password && _password.length >= 6) {
//         if (_repeatPassword == _password) {
//           return true;
//         } else {
//           wx.showToast({
//             title: '密码与确认密码不相同',
//             icon: 'none',
//             duration: 1000
//           })
//           return false;
//         }
//       } else {
//         wx.showToast({
//           title: '密码长度小于6个字符',
//           icon: 'none',
//           duration: 1000
//         })
//         return false;
//       }
//     } 
//   else {
//     wx.showToast({
//       title: '验证码不能为空',
//       icon: 'none',
//       duration: 2000
//     })
//     return false;
//   }

// },
input: function (e) { // 其他内容的输入内容获取
  let _val = e.detail.value
  let that = this
  let _type = e.currentTarget.dataset.inputType
  console.log(_val,_type)
  if (_val.length != 0) {
    that.setData({
      [_type]: _val,
      infoIsNull: false
    })
  } else {
    that.setData({
      infoIsNull: true
    })
  }
},
confirm:function(e){ // 确认发送注册信息
  // if(!this.checkInfo()){
  //   return false;
  // }
  
  let that = this
  let params={
    email:that.data.newEmail,
    choose:'verify',
    checkNum:that.data.validNumber
  };
  wx.cloud.callFunction({
    name:'mail',data:params
  }).then(res=>{
    console.log(res);
    if(res.result.bool){
      wx.navigateBack({
        delta: 1,
      })
    }
  })
  // let params = {
  //   newPassword: that.data.password,
  //   repeatPassword: that.data.repeatPassword,
  //   email: that.data.userInfo.email,
  //   validationCode: that.data.validNumber
  // }

  // let _username = that.data.userInfo.username
  // let _password = that.data.password

    // resetPassword(params).then(res => {
    //   if(res.data.status == 200){
    //     wx.showToast({
    //       title: '修改成功',
    //       icon:'success',
    //       duration: 2000
    //     })
    //     login(_username,_password) // 之后重新登陆
    //   }
    //   else{
    //     wx.showToast({
    //       title: res.data.message,
    //       icon:'none',
    //       duration: 2000
    //     })
    //   }
    // })
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  let that = this;
  const {avatarUrl,username}=app.globalData.get('userInfo');
  that.setData({
    ['userInfo.avatarUrl']:avatarUrl,
    ['userInfo.username']:username
  })
  // myCheckSession(() => {
  //   that.setData({
  //     userInfo:wx.getStorageSync('userInfo') // 确认处于登录态，获取用户资料
  //   })
  // })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})