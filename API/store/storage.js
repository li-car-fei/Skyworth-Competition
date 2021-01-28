// 缓存操作统一封装

export function set(...args){    // 设值
  let key;
  let data
  if(args.length==1){         // 对象形式传值
    ({key,data}=args[0]);
  }else{
    key=args[0];
    data=args[1];
  }
  wx.setStorageSync(key, data)
};

export function get(key){         // 获取值
  return wx.getStorageSync(key);
};

export function remove(key){      // 移除值
  const data=get(key);
  wx.removeStorageSync(key);
  return data
};

export function getAllInfo(){     // 获取全部信息
  return wx.getStorageInfoSync();
};

export function clear(){        // 移除全部信息
  const storeInfo=getAllInfo();
  wx.clearStorageSync();
  return storeInfo;
}