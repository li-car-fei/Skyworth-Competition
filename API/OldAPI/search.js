import httpRequest from '../../utils/httpRequest'
function search(param){
  let url = '/api/search'
  return httpRequest(true,url,4,wx.getStorageSync('sessionId'),param,'GET')
}
export default search