import wxPromise from '../../utils/wxPromise'
export default function(){          
  return wxPromise('getNetworkType')().then(res=>{
    if(res.networkType==='none'){
      wx.showToast({
        title: '网络错误请稍后重试',
        icon:'neone'
      });
      Promise.reject(false);
    }else{
      Promise.resolve(true);
    }
  })
};

// 检测网络是否可用，返回Promise