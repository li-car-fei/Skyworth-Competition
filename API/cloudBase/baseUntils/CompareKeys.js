/**
 * 比较data中的key是否存在于descriptions中，类型的比较放在云端进行吧
 * @param {*} data 
 * @param {*} descriptions 
 */
export default function(data,descriptions){
  const DataKeys=Object.keys(data);
  const DesKeys=Object.keys(descriptions);
  console.log(DataKeys,DesKeys)
  for (let i of DataKeys){
    if(!DesKeys.includes(i)){
      return false
    }
  }
  return true
}