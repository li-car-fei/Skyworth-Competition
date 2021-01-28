//import getFavList from '../../API/getFavList'
//import myCheckSession from '../../API/myCheckSession'
const app=getApp()
import {Collection,_} from '../../API/cloudBase/database'
const FavCollection=new Collection('userFav');
const ComCollection=new Collection('competition');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tarbar:{},
    classification:['比赛','考证'],
    listItems:[[[],[]],[[],[]]], // 展示列表数据
    states:['可参加','已过期'],
    currentState: 0, // 默认为与第一项选中
    isAllDataLoaded: false, // 是否全部数据都已加载
    topBarCurrent: 0 // 顶部栏现在的选中项，默认为0即第一项
  },
  stateOnTap:function(e){ // 切换下方选项的筛选条件
    let current = e.currentTarget.dataset.index
    let that = this
    let _currentState = this.data.currentState
    if(_currentState == current){ // 防止重复加载数据
      return false
    }
      that.setData({
        // isAllDataLoaded: false, // 是否全部数据都已加载
        currentState: current,
      })
      this.list.loadData()
  },

  getListData:async function(){
    const FavResult=await FavCollection.get({});
    const FavList=FavResult.data;
    if(!FavList.length){    // 无收藏记录
      return
    }
    let data=[]               // 根据收藏拿到competition数据
    for(let i=0;i<FavList.length;i++){
      let item=FavList[i]
      const comResult=await ComCollection.get({
        _id:item.competitionId
      });
      if(comResult.data.length){
        let comData=comResult.data[0];
        comData['matchType']=0;
        data.push(comData)
      }
    };
    this.processData(data);
    this.list.loadData()
  },

  // 以下为原始代码
  // getListData:function(){ // 获取列表数据 // 本来想配合后台api做懒加载但是会出现bug，这里有待想办法优化
  //   let that = this
  //  getFavList(1).then(res => {
  //     if(res.data.status == 200 && res.data.pageObject.pages != 0){
  //       for(let i = 1;i <= res.data.pageObject.pages;i++){
  //         getFavList(i).then(res => {
  //           if(res.data.pageObject && res.data.pageObject.records && res.data.pageObject.records.length != 0){
  //             that.processData(res.data.pageObject.records) // 成功请求完数据后进行分组整理
  //             that.setData({
  //               isAllDataLoaded: true
  //             })
              
  //           }
  //           else{
  //             // that.setData({
  //             //   isAllDataLoaded: true
  //             // })
  //           }
  //         })
  //       }
  //     }
  //     else{
  //       wx.showToast({
  //         title: res.data.message,
  //         icon:'none'
  //       })
  //     }
  //   })
  // },
  refreshData:function(e){ // 子组件传值触发的函数
    let _currentState = this.data.currentState
    let _topBarCurrent = this.data.topBarCurrent
    let address = 'listItems[' + _topBarCurrent + '][' + _currentState + ']'
    this.setData({
      [address]: e.detail.listItems
    })
    // console.log(this.data.listItems)
  },
  topBarChange:function(e){
    this.setData({
      topBarCurrent: e.detail.topBarCurrent,
      currentState: 0, // 顶部栏改变时这些页面数据需要复原
      // isAllDataLoaded: false
    })
    this.list.loadData()
  },
  refreshFavList:function(){
    this.onShow() // 取消收藏后刷新页面
  },
  isOverdue:function(time){ // 对比现在的时间
    let currentTime = new Date() // 获取现在的时间
    currentTime = currentTime.getTime()
    //let arr = time.split("-")// 分别获取yyyy-mm-dd,分解成数组的3个元素，再合并成可以比较的时间形式
    let arr=time.split("/");          // 由于数据导入有问题，这里改了以下
    let _time = new Date(arr[0], arr[1], arr[2])
    _time = _time.getTime()
    if(currentTime > _time){
      return true
    }
    else{
      return false
    }
  },
  processData:function(data){ // 对请求到的数据进行分组
    let that = this
    let _listItems = this.data.listItems
    console.log(data)
    data.forEach(e => {
        if(e.matchType == 0 && !that.isOverdue(e.matchBeginTime)){ // 当类型为竞赛可参加时
          _listItems[0][0].push(e)
        }     
        if(e.matchType == 1 && !that.isOverdue(e.matchBeginTime)){ // 当类型为考证可参加时
          _listItems[1][0].push(e)
        }
        if(e.matchType == 0 && that.isOverdue(e.matchBeginTime)){ // 当类型为竞赛已过期
          _listItems[0][1].push(e)
        }
        if(e.matchType == 1 && that.isOverdue(e.matchBeginTime)){ // 档类型为考证已过期
          _listItems[1][1].push(e)
        }
    })
    // console.log(_listItems)
    this.setData({
      listItems: _listItems
    })
  },
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
    this.list = this.selectComponent('#list') // 获取组件
    this.topBar = this.selectComponent('#topBar')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { // 收藏页展示时需要检查登录态
    let that = this
    this.setData({
      isAllDataLoaded: false,
      listItems:[[[],[]],[[],[]]]
    }) // 展示时清空数据重新请求以刷新页面

    this.getListData()
    //this.list.loadData()                            // 先不通过父文件调用

    // myCheckSession(function(){
    //   if(wx.getStorageSync('state')){
    //     that.getListData()
    //     that.list.loadData() // UI同步收藏状态
    //   }
    // });
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isAllDataLoaded: false,
      listItems:[[[],[]],[[],[]]]
    }) // 展示时清空数据重新请求以刷新页面
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
  scrollToLower:function(){
    // let that = this
    // myCheckSession(function(){
    //   let _pageNum = that.data.pageNum
    //   if(wx.getStorageSync('state')){
    //     that.getListData(_pageNum+1)
    //     that.list.loadData()
    //   }
    // });
  },
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})