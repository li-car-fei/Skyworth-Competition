import search from '../../API/OldAPI/search'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultIsNull: false // 默认搜索结果存在
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
  onShow: function () { // 页面展示时发送请求获取搜索结果
    let that = this

    let param = {
      q: wx.getStorageSync('searchHistory')[0],
      getall: 1 // 默认搜索全部
    }
    search(param).then(res => {
      if(res.statusCode == 200){
        if(res.data.matches.content){
          that.setData({
            searchResult: res.data.matches.content,
            resultIsNull: false
          })
        }
        else{
          that.setData({
            resultIsNull: true
          })
        }
      }
      else{
        wx.showToast({
          title: '搜索失败',
          icon: 'none',
          duration: 2000
        })
      }
    });
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