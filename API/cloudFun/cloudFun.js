import cloudFun from './Fun/index'
import {getAuth,checkAuth} from './checkAuth'

const instance=cloudFun.create({a:1,b:1});

instance.before.use(params=>{
  console.log('interceptor before get');
  console.log(params)
  if(params.showLoading){
    const loadingText = typeof params.showLoading === 'string' ? params.showLoading : '加载中';
    wx.showLoading({
      title: loadingText,
    });
    delete params.showLoading
  };
  return params
});

instance.after.use(res=>{
  console.log('interceptor after get');
  console.log(res);
  wx.hideLoading({})
  return res
})

export default instance






// app.cloudFun.call('mail',{
    //   choose:'send',
    //   email:'1073490398@qq.com',
    //   showLoading:'发送email中',

    // })