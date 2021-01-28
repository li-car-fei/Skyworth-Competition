// component/top-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classification: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    topBarCurrent: 0, // 顶部栏默认指向第一项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    topBarOnTap: function (e) { //顶部栏点击
      let _topBarCurrent = this.data.topBarCurrent
      if(_topBarCurrent == e.currentTarget.dataset.index){ // 防止重复加载数据
        return false
      }
      this.setData({
        topBarCurrent: e.currentTarget.dataset.index
      })
      this.triggerEvent('topBarChange',{
        topBarCurrent: this.data.topBarCurrent
      })
    },
    searchOnTap:function(){ // 搜索
      getApp().router.navigate('/pages/search/search')
      // wx.navigateTo({
      //   url: '/pages/search/search',
      // })
    },
    
  },
  options:{
    addGlobalClass: true,
  }
})
