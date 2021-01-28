import Hook from './MyHook'
export default class Router {
  BeforeHook = new Hook()
  AfterHook = new Hook()

  constructor(pages) {
    this._pages = pages;
    this._isNavigated = false;
    this._currentToPath = ''
    //this.init(pages);

  }

  // init(pages){
  //   for(let i=0;i<pages.length;i++){
  //     this._pages[pages[i].name]=pages[i]
  //   }
  // }

  navigate(path, query = {}) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const fromPath = `/${currentPage.route}`;
    const queryStr = this.queryParse(query);
    const toPath = path + queryStr;
    this._currentToPath = toPath;               // 放到全局

    // 根据 path，fromPath 找到对应的配置项
    const { toItem, fromItem } = this.findNavItem(path, fromPath);
    toItem.fullPath = toPath;                 // 完整的路由，包括传参

    const that = this;

    this.BeforeHook.forEach(fun => {
      //console.log('before each')
      if (!that._isNavigated) {               // 还没有真正跳转
        fun(toItem, fromItem, that.wxNavigateTo.bind(that));
      }
    }, 'before');

    if (!this._isNavigated) {             // 在before中没有跳转
      this.wxNavigateTo(toPath);
    }

    this.AfterHook.forEach(fun => {
      fun(toItem, fromItem, that.wxNavigateTo.bind(that));
    })

    // 跳转完成，是否跳转的标志重置
    this._isNavigated = false

  }

  wxNavigateTo(path = '') {
    // 通过一个标志，判断是否已经跳转
    this._isNavigated = true;
    let url = path == '' ? this._currentToPath : path;
    // 当前正在跳转的路由置为空
    this._currentToPath = '';
    wx.navigateTo({
      url
    })
  }

  findNavItem(toPath, fromPath) {
    const toItem = this._pages.find((item, index) => {
      return item.path == toPath
    });
    const fromItem = this._pages.find((item, index) => {
      return item.path == fromPath;
    });
    return { toItem, fromItem };
  }

  queryParse(query) {
    let queryStr = '';
    Object.keys(query).map((key, index) => {
      if (index == 0) {
        queryStr += '?' + key + '=' + query[key];
      } else {
        queryStr += '&' + key + '=' + query[key];
      }
    });
    return queryStr
  }

  beforeEach(fun) {
    this.BeforeHook.beforeEach(fun);
  }

  afterEach(fun) {
    this.AfterHook.afterEach(fun)
  }


}