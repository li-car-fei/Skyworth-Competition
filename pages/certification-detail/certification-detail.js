// pages/certification-detail/certification-detail.js
const {Collection,_}=require('../../API/cloudBase/database')
const CerDetailCollection=new Collection('cerdetail')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItem:{}
  },

  getentrance(){
    const url=this.data.currentItem.registerUrl
    wx.showModal({
      title: 'url',
      content: url
    })
  },

  getscore(){
    const url=this.data.currentItem.scoreUrl
    wx.showModal({
      title: 'url',
      content: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _id = options.id                // 路由传参传来的id
    CerDetailCollection.get({
      _id
    }).then(res=>{
      this.setData({
        currentItem: res.data[0]
      })
    },err=>{
      console.log(err)
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