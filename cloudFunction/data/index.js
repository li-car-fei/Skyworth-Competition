// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db=cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()

  const {collection,type,data,where}=event;
  const Collection=db.collection(collection);
  switch (type){
    case 'add':
      //const {data}=event;
      return await Collection.add({
        data
      });
      break;
    case 'get':
      //const {where}=event;
      return await Collection.where({
        ...where
      }).get();
      break;
    case 'update':
      //const {where,data}=event;
      return await Collection.where({
        ...where
      }).update({
        data
      });
      break;
    case 'remove':
      //const{where}=event;
      return await Collection.where({
        ...where
      }).remove();
      break;
    default:
      return {
        bool:false,
        message:'调用参数错误'
      }
  }

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}