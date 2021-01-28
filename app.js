//app.js
import initGlobalData from './API/store/index'
import config from './config/index'
import init from './API/cloudFun/init'
import cloudFun from './API/cloudFun/cloudFun'
import router from './API/Router/index'
//import {getFavListNum} from './API/CloudFavList'
App({
  onLaunch: function () {
    // 云初始
    init();

    // 隐藏系统tabbar
    wx.hideTabBar();

    // 获取设备信息
    this.getSystemInfo();

  },

  onShow(){
    wx.hideTabBar();
  },

  // setFavListNum(){
  //   const FavNum=getFavListNum();
  //   this.globalData.set({Storage:false,description:{key:'FavNum',data:FavNum}});
  // },

  getSystemInfo: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.systemInfo = res;
      }
    });
  },

  //globalData:initGlobalData(config.appName,[]),

  systemInfo:{},                      // 设备信息

  tabbarInfo:{                          // 自定义导航栏的信息
    "color": "#ACBBBF",
    "selectedColor": "#4C7DC2",
    "borderStyle": "white",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "/pages/competition/competition",
        "text": "比赛",
        "iconPath": "../../src/icons/trophy.png",
        "selectedIconPath": "../../src/icons/trophy_selected.png",
        "point":0
      },
      {
        "pagePath": "/pages/certification/certification",
        "text": "考证",
        "iconPath": "../../src/icons/audit.png",
        "selectedIconPath": "../../src/icons/audit_selected.png",
        "point":0
      },
      {
        "pagePath": "/pages/release/release",
        "text": "",
        "iconPath": "../../src/icons/release.png",
        "isSpecial": true,
        "point":0
      },
      {
        "pagePath": "/pages/favourite/favourite",
        "text": "收藏",
        "iconPath": "../../src/icons/star.png",
        "selectedIconPath": "../../src/icons/star_selected.png",
        "point":0
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "../../src/icons/user.png",
        "selectedIconPath": "../../src/icons/user_selected.png",
        "point":0
      }
    ]
  },

  editTabbar:function(){                            // 引入tabbar信息
    let tabbar = this.tabbarInfo;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  }
})

// 全局挂载store 管理数据
getApp().globalData=initGlobalData(config.appName,[{Storage:false,description:{key:'test',data:1}}])

// 全局挂载cloudFun
getApp().cloudFun=cloudFun

// 全局挂载router
getApp().router=router
