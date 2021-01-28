const _login = require('../../API/OldAPI/login').login
import myCheckSession from '../../API/OldAPI/myCheckSession'
const logout = require('../../API/OldAPI/login').logout
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  input:function(e){ // 根据不同的输入框获得不同的输入值
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
  login:function(){ // 登录键触发事件
    let that = this
    myCheckSession(() => {
      if(wx.getStorageSync('state')){
        logout()
      }
      let _username = that.data.username
      let _password = that.data.password
      _login(_username,_password)
    },
    () => {
      if(wx.getStorageSync('state')){
        logout()
      }
      let _username = that.data.username
      let _password = that.data.password
      _login(_username,_password)
    });
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