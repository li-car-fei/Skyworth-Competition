
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInputIsNull: true // 搜索框是否为空
  },
  checkSearchInput:function(val){ // 检查输入框输入
    let that = this
    if(val){
      that.setData({
        searchInputIsNull: false
      })
    }
    else{
      that.setData({
        searchInputIsNull: false
      })
    }
  },
  searchInput:function(e){ // 获取搜索框的输入
    let _val = e.detail.value
    this.checkSearchInput(_val);
    this.setData({
      searchInput: _val
    })
  },
  searchOnTap:function(){ // 进行搜索
    let that = this
    let _searchInput = that.data.searchInput
    let _historyList = wx.getStorageSync('searchHistory')
        if(!_historyList){
          _historyList = []
        }
        _historyList.unshift(_searchInput) // 从头部开始向数组插入元素
        wx.setStorageSync('searchHistory', _historyList)
        wx.navigateTo({
          url: '/pages/search-result/search-result',
        })
        that.onShow();
  },
  clearHistory:function(){ // 清除搜索历史
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要清除搜索历史吗?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeStorageSync('searchHistory')
          that.onShow();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  historyItemOnTap:function(e){ // 点击搜索历史自动填入搜索框
    let _index = e.currentTarget.dataset.index
    let _val = wx.getStorageSync('searchHistory')[_index]
    this.checkSearchInput(_val);
    this.setData({
      searchInput: _val
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
  onShow: function () { // 页面显示更新搜索历史
    let _historyList = wx.getStorageSync('searchHistory')
    this.setData({
      historyList: _historyList
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