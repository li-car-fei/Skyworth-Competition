// pages/certification/certification.js
const {Collection,_}=require('../../API/cloudBase/database')
const CerCollection=new Collection('certification')
const CerDetailCollection=new Collection('cerdetail')
const app=getApp();
import {downloadFile} from '../../API/cloudFile/loadFile'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifications:[],
    onTap:[],//哪个模块被点击下拉
  },
downOnTap:function(e){
  let index=e.currentTarget.dataset.index
  let address= "onTap["+index+"]"
  let nowVal=!this.data.onTap[index]
  this.setData({
    [address]: nowVal,
    onTapIndex: index
  })
},
listItemOnTap:function(e){
  let id = e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/certification-detail/certification-detail?id='+id,
  })
},

// 获取每个certification的具体信息
async getDetails(typeName){
  const details_result=await CerDetailCollection.get({
    typeName
  });
  //console.log(details_result)
  return details_result.data
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 加载数据
    var that=this
    const certifications_result=await CerCollection.get({});
    const certifications=certifications_result.data;
    // certifications.forEach(async function(item){
    //   const listItems=await that.getDetails(item.EntypeName);
    //   item.listItems=listItems;
    // });
    for(let i=0;i<certifications.length;i++){
      const listItems=await that.getDetails(certifications[i].EntypeName);
      certifications[i].listItems=listItems
    }
    this.setData({
      classifications:certifications
    })
    //console.log(this.data.classifications);


    app.editTabbar()




    // 设置_onTap
    let length=this.data.classifications.length
    let _onTap=[]
    for(let i=0;i < length;i++){
      _onTap.push(false)
    }
    this.setData({
      onTap: _onTap
    })

    // 在这里添加certification表的数据
    // CerCollection.add({
    //   EntypeName:'ellipsis',
    //   typeName: '专业及其其他考证',
    //   iconName: 'ellipsis-icon'
    // })

    // 在这里添加cerdetail
    // CerDetailCollection.add({
    //   typeName:'teacher',
    //   name:'教师证',
    //   detail:'教师证考试。',
    //   registerUrl:'https://toefl.neea.cn/',
    //   scoreUrl:'https://toefl.neea.cn/'
    // })
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