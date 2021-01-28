// components/tabbar/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar:{
      type:Object,
      value:{
        "color": "#ACBBBF",
    "selectedColor": "#4C7DC2",
    "borderStyle": "white",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "/pages/competition/competition",
        "text": "比赛",
        "iconPath": "../../src/icons/trophy.png",
        "selectedIconPath": "../../src/icons/trophy_selected.png"
      },
      {
        "pagePath": "/pages/certification/certification",
        "text": "考证",
        "iconPath": "../../src/icons/audit.png",
        "selectedIconPath": "../../src/icons/audit_selected.png"
      },
      {
        "pagePath": "/pages/realease/realease",
        "text": "",
        "iconPath": "../../src/icons/release.png",
        "isSpecial": true
      },
      {
        "pagePath": "/pages/favourite/favourite",
        "text": "收藏",
        "iconPath": "../../src/icons/star.png",
        "selectedIconPath": "../../src/icons/star_selected.png"
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "../../src/icons/user.png",
        "selectedIconPath": "../../src/icons/user_selected.png"
      }
    ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // navigateTo(e){                      // 导航栏不可抵制导航
    //   app.router.navigate(e.currentTarget.dataset.url)
    // }
  }
})