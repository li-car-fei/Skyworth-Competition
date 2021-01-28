const utils = require('../../utils/utils')
const checkEmail = utils.checkEmail
const login = require('../../API/OldAPI/login').login
const getValNum1 = require('../../API/OldAPI/register').getValNum1
const _register = require('../../API/OldAPI/register').register
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emailIsLegal:false, // 邮箱是否合法
    validNumberIsWrong: false, // 验证码是否错误
    isGettingValidNumber: false, // 是否正在获取验证码
    sendMg: '获取验证码', // 按钮上显示的文本
    countDownTime: 60 // 倒计时为60s
  },
  emailInput:function(e){ // 邮箱的输入
    let _val = e.detail.value
    let that = this
    if(_val.length != 0){
      that.setData({
        email: _val,
        emailIsLegal: true
      })
    }
    else{
      that.setData({
        emailIsLegal: false
      })
    }
  },
  input:function(e){ // 其他内容的输入内容获取
    let _val = e.detail.value
    let that = this
    let _type = e.currentTarget.dataset.inputType
    if(_val.length != 0){
      that.setData({
        [_type]: _val,
        infoIsNull: false
      })
    }
    else{
      that.setData({
        infoIsNull: true
      })
    }
  },
  
  getValidNumber:function(e){ // 获取验证码
    let _email = this.data.email
    let that = this
    if(!checkEmail(_email)){
      return false;
    }
    getValNum1(_email).then((res) => {
      console.log(res)
      that.getCountDown()
    })
    
  },
  getCountDown:function(){ //验证码一分钟倒计时
    let time = this.data.countDownTime; 
    let that = this;
    let _sendMg;
      if(time <= 0){ // 倒计时结束
        that.setData({
          isGettingValidNumber: false,
          sendMg : "获取验证码",
          countDownTime: 60
        })
          return false;
      }
      that.setData({
        isGettingValidNumber: true
      })
      time = parseInt(time)-1;
      _sendMg = "重新获取("+time+")s"
      that.setData({
        sendMg: _sendMg,
        countDownTime: time
      })
      setTimeout(this.getCountDown, 1000)
  },
  checkInfo:function(){ // 检查输入信息是否合法
    let _username = this.data.username
    let _password = this.data.password
    let _repeatPassword = this.data.repeatPassword
    let _validNumber = this.data.validNumber
    if(_validNumber){
      if(_username && _username.length >= 2){
        if(_password && _password.length >= 6){
          if(_repeatPassword == _password){
            return true;
          }
          else{
            wx.showToast({
              title: '密码与确认密码不相同',
              icon:'none',
              duration: 1000
            })
            return false;
          }
        }
        else{
          wx.showToast({
            title: '密码长度小于6个字符',
            icon:'none',
            duration: 1000
          })
          return false;
        }
      }
      else{
        wx.showToast({
          title: '用户名长度小于2个字符',
          icon:'none',
          duration: 1000
        })
        return false;
      }
    }
    else{
      wx.showToast({
        title: '验证码不能为空',
        icon:'none',
        duration: 2000
      })
      return false;
    }
    
  },
  
  register:function(e){ // 确认发送注册信息
    if(!this.checkInfo()){
      return false;
    }
    
    let that = this
    let registerParams = {
      username: that.data.username,
      password: that.data.password,
      repeatPassword: that.data.repeatPassword,
      email: that.data.email,
      validationCode: that.data.validNumber
    }
    // console.log(registerParams)

      let _username = that.data.username
      let _password = that.data.password

      _register(registerParams).then(res => {
      if(res.data.status == 200){
        wx.showToast({
          title: '注册成功',
          icon:'success',
          duration: 2000
        })
        login(_username,_password)
      }
      else{
        wx.showToast({
          title: res.data.message,
          icon:'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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