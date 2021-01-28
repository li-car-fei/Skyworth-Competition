// 把信息中心暴露出去

import Emitter from './emitter'
export default function initGlobalData(name,GlobalData){
  return new Emitter(name,GlobalData);
}