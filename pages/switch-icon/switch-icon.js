import myCheckSession from '../../API/OldAPI/myCheckSession'
import switchIcon from '../../API/OldAPI/switchIcon'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconIsSelected: false
  },
  selectIcon:function(e){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success : res =>  {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths
        that.setData({
          imagePath: tempFilePath[0],
          iconIsSelected: true
        })
        console.log(that.data.imagePath)
      },
      fail : res => {
        console.log("select icon fail")
        console.log(res)
      }
    })
  },
  confirm:function(){ // 确认上传
    let that = this
    myCheckSession(() => {
      let params = {
        username:that.data.username,
        imagePath: that.data.imagePath
      }
      switchIcon(params).then( res => {
        let _data = JSON.parse(res.data)
        console.log(_data)
        if(_data.status == 200){ // 此处可能由于小程序请求文件的api问题，返回的data为字符串格式
                                    // 此处需要作转换
          wx.showToast({ // 请求成功后返回mine页面刷新userInfo
            title: '上传成功！',
            icon: 'success'
          })
          wx.switchTab({
            url: '/pages/mine/mine'
          })
          
        }
        else{
          wx.showToast({
            title: _data.message,
            icon:'none'
          })
        }
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    myCheckSession(() => {
      let _userInfo = wx.getStorageSync('userInfo')
      if(_userInfo){
        that.setData({
          username: _userInfo.username,
          imagePath: _userInfo.avatarUrl
        })
      }
      else{
        console.log('未登录')
      }
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