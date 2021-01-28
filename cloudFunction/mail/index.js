// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const {GetRandomNum,sendMail}=require('./send')


// 云函数入口函数
exports.main = async (event, context) => {      // event 是传入的参数
  const wxContext = cloud.getWXContext()
  const {choose,email}=event;

  if(choose=='send'){
    const RandNum = GetRandomNum();         // 随机数
    const result=await sendMail(email,RandNum);
    if(result.bool){
      // await mailCheck.add({
      //   data:{
      //     mail:email,
      //     num:RandNum
      //   }
      // })
      await cloud.callFunction({
        name:'data',
        data:{
          type:'add',
          collection:'mailCheck',
          data:{
          mail:email,
          num:RandNum
          }
        }
      })
    }
    return result;
  }else if(choose=='verify'){
    const {checkNum}=event;
    // const {data}=await mailCheck.where({
    //   mail:email,
    //   num:checkNum
    // }).get();
    const {result}=await cloud.callFunction({
      name:'data',
      data:{
        type:'get',
        collection:'mailCheck',
        where:{
        mail:email,
        num:checkNum
        }
      }
    });
    if(result.data.length){
      // await mailCheck.where({mail:email,
      //   num:checkNum}).remove();
      await cloud.callFunction({
        name:'data',
        data:{
          type:'get',
          collection:'mailCheck',
          where:{
            mail:email,
            num:checkNum
          }
        }
      })
      // 修改用户信息
      return {
        bool: true,
        message:'验证码正确'
      }
    }else{
      return {
        bool: false,
        message:'验证码错误'
      }
    }
  }else{
    return {
      bool:false,
      message:'输入错误'
    }
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}