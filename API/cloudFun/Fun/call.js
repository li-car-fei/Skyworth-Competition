export default function(params){
  const {_FunName,...data}=params
  return new Promise((resolve,reject)=>{
    wx.cloud.callFunction({name:_FunName,data}).then(res=>{
      resolve(res.result);
    }).catch(err=>{
      reject(err)
    })
  })
}