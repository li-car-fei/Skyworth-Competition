//import myCheckSession from '../../API/myCheckSession'
//const _logout = require('../../API/login').logout
//const myGetUserInfo = require('../../API/login').myGetUserInfo
const app=getApp();
import wxPromise from '../../utils/wxPromise'
import {checkAuth,getUserInfo} from '../../API/cloudFun/checkAuth'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:{},
    functionList: [{
      name: '个人信息',
      iconName: 'userInfo-icon'
    },{
      name: '切换用户',
      iconName: 'switchUser-icon'
    }],
    state: false, // 当前用户状态默认为未登录/注册
    userInfo: {},
    defaultAvatar: '/src/images/sample.jpeg' // 未登录前的默认头像
  },
  register: function (e) { // 不同的按钮对应的跳转
    wx.navigateTo({
      url: "/pages/login-or-register/login-or-register",
    })
  },
  editEmail: function (e) {                       // 修改邮箱
    wx.navigateTo({
      url: "/pages/edit-new-password/edit-new-email",
    })
  },
  switchIcon: function (e) { // 切换头像
    let _state = this.data.state
    let that = this
    if (_state) {
      wx.navigateTo({
        url: "/pages/switch-icon/switch-icon",
      })
    } else {
      that.register();
    }
  },
  functionListOnTap: function (e) {
    let index = e.currentTarget.dataset.index
    let _state = this.data.state
    if (_state) {
      switch (index) {
        case 0:
          wx.navigateTo({
            url: "/pages/userInfo/userInfo",
          });
          break;
        case 1:
          wx.navigateTo({
            url: "/pages/login/login",
          });
          break;
      }
    } else {
      wx.showToast({
        title: '请先登录/注册',
        icon: 'none',
        duration: 1000
      })
    }
  },
  // logout: function (e) { // 登出
  //   let that = this
  //   _logout(() => {
  //     that.onShow();
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
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
    let that = this;
    const userInfo=getUserInfo();
    if(userInfo){
      that.setData({
        state:true,
        ['userInfo.avatarUrl']:userInfo.avatarUrl,
        ['userInfo.username']:userInfo.nickName
      });
    }
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