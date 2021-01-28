import {getAuth} from '../../API/cloudFun/checkAuth'
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirect:'',
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    defaultAvatar: '/src/images/sample.jpeg' // 未登录前的默认头像
  },
  // login:function(e){ // 
  //   wx.navigateTo({
  //     url: '/pages/login/login',
  //   })
  // },
  // register:function(e){
  //   wx.navigateTo({
  //     url: '/pages/register/register',
  //   })
  // },
  bindGetUserInfo(e){
    const that=this
    wx.showToast({
      title: '获取登录信息中',
    })
    getAuth().then(res=>{
      wx.hideToast({
        success: (res) => {
          if(that.data.redirect){
            app.router.navigate(that.data.redirect)
          }else{
            wx.navigateBack({
              delta: 1,
            })
          }
        },
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      redirect:options.redirect               // 监听有没有redirect
    })
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