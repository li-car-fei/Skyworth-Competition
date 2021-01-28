const utils = require('../../utils/utils')
//import httpRequest from '../../utils/httpRequest'
//const formatNumber = utils.formatNumber
//import wxPromise from '../../utils/wxPromise'

import {Collection,_} from '../../API/cloudBase/database'
const CompeCollection=new Collection('competition');

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:{},
    classification:[], // 顶部栏的分类
    timeLineCurrent: 0, // 当前的时间筛选项
    //swiperItems:[],
    swiperImg:[
      "cloud://skyworth-competition-ssvtw.736b-skyworth-competition-ssvtw-1303862399/swiper/职业发展大赛.jpg",
      "cloud://skyworth-competition-ssvtw.736b-skyworth-competition-ssvtw-1303862399/swiper/普译奖.png",
      "cloud://skyworth-competition-ssvtw.736b-skyworth-competition-ssvtw-1303862399/swiper/华教杯.jpg",
      "cloud://skyworth-competition-ssvtw.736b-skyworth-competition-ssvtw-1303862399/swiper/工业创新赛.jpg",
      "cloud://skyworth-competition-ssvtw.736b-skyworth-competition-ssvtw-1303862399/swiper/发现杯.jpg"
    ],             // 轮播图图片地址
    listItems:[[],[],[],[]], // 列表数据，分为四组分开互不干扰
    timeLine:['全部','今年','最近三个月','本月'], // 时间筛选选项
    pageNum: 1, // 默认初始的当前查看页数为第1页
    isAllDataLoaded: false, // 是否全部数据都已加载
    skips:[0,0,0,0]                  // 云函数分批获取的标志
  },
  timeLineOnTap:function(e){ // 切换时间筛选条件
    let _timeLineCurrent = this.data.timeLineCurrent
    let _index = e.currentTarget.dataset.index
    let that = this
    
    this.setData({
      timeLineCurrent: _index,
      pageNum: 1 // 点击按钮后无论怎样都先将当前页数设为1
    })
    if(_index == _timeLineCurrent){ // 防止多次点击重复加载数据
      return false;
    }
    else{
      that.setData({ // 点击有效之后先将是否全部数据已加载的设为false
        isAllDataLoaded: false,
        //[skips[_index]]:0                      // 分批加载指针设0
        //listItems:[[],[],[],[]] // 点击有效之后将本来加载的数据清空
      })
    }
    const dateChoose=['',this.data.YearRaw,this.data.SeasonRaw,this.data.MonthRaw];
    this.getDatainfo(_index,dateChoose[_index]) // 根据选择的时间筛选条件加载不同数据

  },

  getDatainfo(index,date=''){          // index:筛选条件指针    date:筛选的时间
    let that=this;
    let _timeLineCurrent = this.data.timeLineCurrent;
    let address = 'listItems['+ _timeLineCurrent +']' // 用于设置当前时间筛选的数据
      // 时间筛选
      let listItems=that.data.listItems[_timeLineCurrent];
      let skip=that.data.skips[index];
      const where={};
      if(date) where.matchBeginTimeRaw=_.gte(date)
      CompeCollection.getchooselimit(where,skip,5).then(res=>{
        //console.log(res.data);
        if(!res.data.length){
          skip+=5;
          that.setData({
            isAllDataLoaded:true,
            [`skips[${index}]`]:skip
          });
          return
        };
        listItems=listItems.concat(res.data);
        skip+=5
        that.setData({
          [address]:listItems,
          [`skips[${index}]`]:skip
        });
        that.list.loadData(skip-5)          // 组件查看用户收藏情况
      },err=>{
        console.log(err);
        wx.showToast({
          title: '列表数据获取失败！',
          icon:'none'
        })
      })
  },

  // getListData:function(_pageNum){ // 获取列表数据
  //   // 以下是原始代码
  //   // let that = this
  //   // let _timeLineCurrent = this.data.timeLineCurrent
  //   // let _listItems = this.data.listItems[_timeLineCurrent]
  //   // let address = 'listItems['+ _timeLineCurrent +']' // 用于设置当前时间筛选的数据
  //   // let listUrl = '/api/match/list/'  + _pageNum
  //   // httpRequest(true,listUrl,1,null,null,'GET').then(res => {
  //   //   if(res.statusCode == 200){
  //   //     console.log(res.data)
  //   //     if(res.data.pageObject.records.length != 0){
  //   //       res.data.pageObject.records.forEach(e => {
  //   //         _listItems.push(e)
  //   //       })
  //   //       that.setData({
  //   //         [address]: _listItems,
  //   //         pageNum: _pageNum,
  //   //         isAllDataLoaded: false
  //   //       })
  //   //     }
  //   //     else{
  //   //       that.setData({
  //   //         isAllDataLoaded: true
  //   //       })
  //   //     }
  //   //   }
  //   //   else{
  //   //     wx.showToast({
  //   //       title: '列表数据获取失败！',
  //   //       icon:'none'
  //   //     })
  //   //   }
  //   // });
  // },
  // getListDataByDate:function(_pageNum,params){ // 与请求全部列表数据时分开为两个不同函数
  //   let that = this
  //   let _timeLineCurrent = this.data.timeLineCurrent
  //   let _listItems = this.data.listItems[_timeLineCurrent]
  //   let address = 'listItems[' + _timeLineCurrent + ']'
  //   let listUrl = '/api/search/range/'  + _pageNum
  //   httpRequest(true,listUrl,1,null,params,'POST').then(res => {
  //     if(res.statusCode == 200){
  //       console.log(res.data)
  //       if(res.data.matches.records.length != 0){
  //         res.data.matches.records.forEach(e => {
  //           _listItems.push(e)
  //         })
  //         that.setData({
  //           [address]:_listItems,
  //           pageNum: _pageNum,
  //           isAllDataLoaded: false
  //         })
  //       }
  //       else{
  //         that.setData({
  //           isAllDataLoaded: true
  //         })
  //       }
  //     }
  //     else{
  //       wx.showToast({
  //         title: '列表数据获取失败！',
  //         icon:'none'
  //       })
  //     }
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // 加载页面时先确定日期及其参数
    //console.log(new Date("2020-07-12"));
    let date=new Date()                   
    let currentYear=date.getFullYear()            // 当前年份
    let YearRaw=new Date(currentYear+"-01-01")        // 今年第一天
    let currentMonth=date.getMonth()+1              // 当前月份
    let MonthRaw=new Date(currentYear+"-"+currentMonth+"-01")   // 当前月第一天
    let SeasonMonth=currentMonth-3                    // 三个月前月份
    let SeasonRaw=new Date(currentYear+"-"+SeasonMonth+'-01')         // 三个月前
    this.setData({
      YearRaw,
      MonthRaw,
      SeasonRaw
    });


    // 加载底部导航栏
    app.editTabbar();

    // wxPromise('login')().then(res=>{
    //   console.log(res)
    // })

    // console.log(app.globalData.get('storeTest'));
    // app.globalData.on('storeTest',(oldV,newV,a,b)=>{
    //   console.log(oldV,newV,a,b)
    // })
    // app.globalData.set({
    //   Storage:false,
    //   description:{key:'storeTest',data:'new Test Val'}
    // },1,'1');




    // 这里下面是原始代码
    // let date = new Date()
    // let currentYear = date.getFullYear()
    // let currentMonth = date.getMonth() + 1
    
    // let _thisYearParam = {
    //   begin: currentYear + "-01-01",
    //   end: currentYear + "-12-31"
    // }
    // //获取第三个月的最后一天
    // date.setMonth(currentMonth+2)
    // let lastDay1 = date.setDate(0)
    // let _thisSeasonParam = {
    //   begin: [currentYear, currentMonth, "01"].map(formatNumber).join('-'),
    //   end: [currentYear, (currentMonth+2), new Date(lastDay1).getDate()].map(formatNumber).join('-')
    // }
    // //获取当前月的最后一天
    // date.setMonth(currentMonth)
    // let lastDay2 = date.setDate(0)
    // let _thisMonthParam = {
    //   begin: [currentYear, currentMonth, "01"].map(formatNumber).join('-'),
    //   end: [currentYear, currentMonth, new Date(lastDay2).getDate()].map(formatNumber).join('-')
    // }
    // this.setData({
    //   thisYearParam: _thisYearParam,
    //   thisSeasonParam: _thisSeasonParam,
    //   thisMonthParam: _thisMonthParam
    // });


  },
  refreshData:function(e){ // 子组件传值触发的函数
    let _timeLineCurrent = this.data.timeLineCurrent
    let address = 'listItems[' + _timeLineCurrent + ']'
    this.setData({
      [address]: e.detail.listItems
    })
    // console.log(this.data.listItems)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.list = this.selectComponent('#list') // 获取组件
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { // 页面展示时刷新数据
    let swiperUrl = '/api/match/carouselFigure'
    let that = this

    // 以下是原始代码
    // httpRequest(true,swiperUrl,1,null,null,'GET').then(res => {     // 获取轮播图
    //   if(res.data.status == 200){
    //     if(res.data.matches){
    //       that.setData({
    //         swiperItems: res.data.matches
    //       })
    //     }
    //     else{
    //       wx.showToast({
    //         title: '暂无轮播图数据！',
    //         icon:'none'
    //       })
    //     }
    //   }
    //   else{
    //     wx.showToast({
    //       title: '轮播图数据获取失败！',
    //       icon:'none'
    //     })
    //   }
    // })
    this.setData({
      listItems: [[],[],[],[]], // 每次onshow清空数据再重新获取
      isAllDataLoaded:false,
      skips:[0,0,0,0]
    })
    //that.getListData(1)             // 获取competition数据
    that.getDatainfo(0)
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

  onReachBottom:function(){
    let _timeLineCurrent = this.data.timeLineCurrent;
    let _isAllDataLoaded=this.data.isAllDataLoaded;
    if(!_isAllDataLoaded){
      const dateChoose=['',this.data.YearRaw,this.data.SeasonRaw,this.data.MonthRaw];
    this.getDatainfo(_timeLineCurrent,dateChoose[_timeLineCurrent])
    }
  },

  // 以下是原始代码
  // onReachBottom: function () {
  //   let _pageNum = this.data.pageNum
  //   let that = this
  //   let _timeLineCurrent = this.data.timeLineCurrent
  //   switch (_timeLineCurrent) { // 当点击‘全部’以外的选项时，都按时间搜索去获取下一页
  //     case 0:{
  //       that.getListData(_pageNum + 1)
  //       that.list.loadData()
  //     }
  //       break;
  //     case 1:{
  //       console.log(that.data.thisYearParam)
  //       that.getListDataByDate(_pageNum + 1,that.data.thisYearParam)
  //       that.list.loadData()
  //     }
  //       break;
  //     case 2:{
  //       console.log(that.data.thisSeasonParam)
  //       that.getListDataByDate(_pageNum + 1,that.data.thisSeasonParam)
  //       that.list.loadData()
  //     }
  //       break;
  //     case 3:{
  //       console.log(that.data.thisMonthParam)
  //       that.getListDataByDate(_pageNum + 1,that.data.thisMonthParam)
  //       that.list.loadData()
  //     }
  //       break;
  //     default:
  //       break;
  //   }
    
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})