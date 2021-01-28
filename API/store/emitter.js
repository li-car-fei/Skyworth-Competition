/** 全局信息监听管理中心
 * @param {string} name -信息监听中心名称
 * @param {array} data -初始化注册信息，包括Storage标志，description对象{key,data}
 */
import * as Storage from './storage'
class Emitter {
    constructor(name,data) {  
        this.name = name;
        this._globalData={};      // 全局信息
        this._Handlers = {};
        this.init(data);
    };
    init(data){                   // 全局信息初始化
      let des={}                // 信息对象
      for(const obj of data){
        if(obj.Storage){          // 需要储存在缓存中
          Storage.set(obj.description)
        };
        des=obj.description;
        this._globalData[des.key]=des.data;   // 存入信息
        this._Handlers[des.key]=[]        // 监听队列
      };
      //console.log(this._globalData,this._Handlers)
    };
    set(obj,...options){                   // 设置的信息对象包括Storage标志，description对象{key,data}
    const des=obj.description;
    const oldData=this._globalData[des.key];
    if(obj.Storage){                  // 需要进行缓存更新
      Storage.set(obj.description)
    };
    this.emit(des.key,oldData,des.data,...options) // 通知监听者更新
    this._globalData[des.key]=des.data;     // 设置新值
    };
    get(key){                       // 获取信息
      return this._globalData[key];
    };
    remove(key){                    // 移除
      const oldData= this._globalData[key];
      Storage.remove(key);
      if(this._Handlers[key]){
        delete this._Handlers[key]
      }
    }

    /**
     * 
     * @param {*} key - 监听的key
     * @param {*} listener - 触发函数  listener(oldVal,newVal[options])
     */
    on(key, listener) {               // 设置监听者
        if (!this._Handlers[key]) {
            this._Handlers[key] = [];
        };
        this._Handlers[key].push(listener);
    }
    off(key, listener) {              // 移除监听者
        if (!this._Handlers[key]) {
            return
        };
        const index = this._Handlers[key].indexOf(listener);
        if (index) {
            this._Handlers[key].splice(index, 1);
        };
    };
    emit(key, ...args) {              // 触发监听队列
        if (!this._Handlers[key]) {
            return
        };
        this._Handlers[key].forEach(listener => listener.apply(this, args));
    }
}

export default Emitter