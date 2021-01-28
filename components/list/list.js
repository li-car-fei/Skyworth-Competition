const utils = require('../../utils/utils')
//const findByMatchId = utils.findByMatchId
//import httpRequest from '../../utils/httpRequest'
//import myCheckSession from '../../API/myCheckSession'

const {Collection,_}=require('../../API/cloudBase/database');
const FavCollection=new Collection('userFav')



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listItems: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 面向云开发的代码
    toggleFavourite: function (e){
      var that=this;
      const id=e.currentTarget.dataset.id;
      FavCollection.get({
        competitionId:id
      }).then(res=>{
          if(!res.data.length){         // 收藏记录没有这条
            FavCollection.add({     // 收藏
              competitionId:id,
              favTime:new Date()
            }).then(res=>{
              // 找到这条记录并更新数据
              let listItems=that.data.listItems;
              const index=listItems.findIndex(item=>{
              return item._id==id
              });
              listItems[index]['isFav']=true
              that.triggerEvent('refreshData', { // 触发父页面的事件，更新UI
              listItems: listItems
              })
            })
        }else{                          // 收藏记录有这条
          FavCollection.remove({
            competitionId:id
          }).then(res=>{
            // 找到这条记录并更新数据
            let listItems=that.data.listItems;
            const index=listItems.findIndex(item=>{
            return item._id==id
            });
            listItems[index]['isFav']=false
            that.triggerEvent('refreshData', { // 触发父页面的事件，更新UI
            listItems: listItems
            })
          })
        }
      })
    },

    async loadData(skip=0){             // skip 标识跳过某些数据
      if(!this.data.listItems.length){
        // 还没有数据，
        return
      };
      if(skip){
        // 分批处理
        var that =this;
        let listItems=this.data.listItems;
        let DealList=listItems.slice(skip)    // skip后面的数据都要验证
        let DoneList=listItems.slice(0,skip)
        for(let i=0;i<DealList.length;i++){
          const item=DealList[i];
          const result=await FavCollection.get({
            competitionId:item._id
          })
          if(!result.data.length){      // 没有收藏这条
            continue
          }else{                    // 收藏了这条
            item['isFav'] = true
          }
        };
        listItems=DoneList.concat(DealList);
        that.triggerEvent('refreshData', { // 触发父页面的事件，更新UI
          listItems: listItems
        })
      }else{
        var that =this;
        let listItems=this.data.listItems;
        for(let i=0;i<listItems.length;i++){
          const item=listItems[i]
          const result=await FavCollection.get({
          competitionId:item._id
        })
        if(!result.data.length){      // 没有收藏这条
          continue
        }else{                    // 收藏了这条
          item['isFav'] = true
          }
        }
        that.triggerEvent('refreshData', { // 触发父页面的事件，更新UI
          listItems: listItems
        })
      }
    },






    // toggleFavourite: function (e) {
    //   let addFavUrl = '/api/user/addFav'
    //   let rmvFavUrl = '/api/user/removeFav/'
    //   let that = this
    //   let id = e.currentTarget.dataset.id
    //   let currentItem = findByMatchId(that.data.listItems, id)
    //   let previous = currentItem.isFav // 是否已收藏，未收藏的不存在isFav属性即为undefined
    //   myCheckSession(() => {
    //     if (!previous) { 
    //       httpRequest(true,addFavUrl,2,wx.getStorageSync('sessionId'),{ matchId:id },'POST').then( res => {
    //         if(res.data.status == 200){
    //           that.loadData() // 请求成功后更新一下显示的收藏状态
    //           wx.showToast({
    //             title: '收藏成功',
    //             icon: 'success',
    //             duration: 1000
    //           })
    //         }
    //         else{
    //           wx.showToast({
    //           title: res.data.message,
    //           icon: 'none',
    //           duration: 1000
    //         })
    //         }
    //       })

    //   } else {
    //     wx.showModal({
    //       title: '提示',
    //       content: '确定取消收藏吗？',
    //       success(res) {
    //         if (res.confirm) {
    //           console.log('confirm')
    //           httpRequest(true,rmvFavUrl + id,4,wx.getStorageSync('sessionId'),null,'DELETE').then( res => {
    //             if(res.data.status == 200){
    //               that.loadData(id) // 每次只能单个取消收藏，取消收藏的id传值用以更新UI
    //               that.triggerEvent('refreshFavList', {}) // 触发父页面的事件，更新UI
    //             }
    //             else{
    //               wx.showToast({
    //                 title: '请求失败',
    //                 icon: 'none'
    //               })
    //             }
    //           })
    //         } else if (res.cancel) {
    //           console.log('cancel')
    //         }
    //       }
    //     })
    //   }
    //   },()=>{
    //     console.log('sessionId不存在')
    //   })
    // },
    // loadData: function(delId){ // 加载数据使list显示是否处于收藏状态，
    //                            // delId为可选参数，当移除收藏时传入被移除收藏item的id
    //   let that = this
    //   let favListIds = []
    //   let listUrl = '/api/user/showFav/'
    //   myCheckSession(() => {
    //     httpRequest(false, listUrl + '1', 4, wx.getStorageSync('sessionId'), null, 'GET').then(res => {
    //       if (res.statusCode == 200) {
    //         if(res.data.pageObject){ // 用户无收藏时返回数据没有pageObject
    //           for (let _pages = res.data.pageObject.pages; _pages > 0; _pages--) { // 当有多页收藏时循环获取所有的收藏matchId
    //             httpRequest(false, listUrl + _pages, 4, wx.getStorageSync('sessionId'), null, 'GET').then(function (res) {
    //                 if (res.data.pageObject.records && res.data.pageObject.records.length != 0) {
    //                   res.data.pageObject.records.forEach(item => {
    //                     favListIds.push(item.matchId)
    //                   })
    //                 } else {
    //                   console.log('当前页无收藏！')
    //                 }
    //               })
    //               .then(() => {
    //                 if (favListIds && favListIds.length != 0) { // 寻找与提取出来收藏列表id相同的比赛，并给予属性isFav(是否被收藏)
    //                   favListIds.forEach(id => {
    //                     that.data.listItems.forEach(item => {
    //                       if(delId){
    //                         if(item.matchId == delId){ // 取消收藏时修改isFav属性
    //                           item['isFav'] = false
    //                         }
    //                       }
    //                       if (item.matchId == id) { // 收藏时添加isFav属性，嵌套循环寻找被收藏的item
    //                         item['isFav'] = true
    //                       }
    //                     })
    //                   })
    //                 }
    //                 else{ 
    //                   that.data.listItems.forEach(item => {
    //                     if(delId){ // 收藏列表的最后一项被移除
    //                       if(item.matchId == delId){
    //                         item['isFav'] = false
    //                       }
    //                     }
    //                   })
    //                 }
    //                 that.triggerEvent('refreshData', { // 触发父页面的事件，更新UI
    //                   listItems: that.data.listItems
    //                 })
    //               })
    //           }
    //         }
    //         else{
    //           console.log('该用户无收藏！')
    //         }
    //       } else {
    //         console.log('获取收藏失败！')
    //       }
    //     })

    //   });
    // }
  },
  lifetimes: {
    created: function () {

    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.loadData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.loadData();
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  }
})