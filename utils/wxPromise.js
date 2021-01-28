function wxPromise(api){
  return (options={})=>{
    return new Promise((resolve,reject)=>{
      wx[api]({
        ...options,...{
          success(res) {
            resolve(res)
          },
          fail(err) {
            wx.showToast({
              title: options.errorTip || '系统调用异常',
              icon: 'none',
              mask: true,
              duration: 1500
            });
            reject(err)
          }
        }
      })
    })
  }
};

export default wxPromise