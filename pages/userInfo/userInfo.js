//const utils = require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    majors:['信息工程','电子科学与技术'],
    majorIndex: -1, // 所选择的专业编号，-1为未选择
    phoneNumber:'',
    isPhoneNumberNull: true // 电话号码是否为空
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      majorIndex: e.detail.value
    })
  },
  emailInput:function(e){
    let _val = e.detail.value
    let that = this
    if(_val.length != 0){
      that.setData({
        isPhoneNumberNull: false
      })
    }
    else{
      that.setData({
        isPhoneNumberNull: true
      })
    }
    this.setData({
      phoneNumber: _val,
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
    let _userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo:_userInfo
    })
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