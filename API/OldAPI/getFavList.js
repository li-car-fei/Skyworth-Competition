import httpRequest from '../../utils/httpRequest'
function getFavList(pageNum){
  let listUrl = '/api/user/showFav/'
  return httpRequest(false,listUrl+pageNum,4,wx.getStorageSync('sessionId'),null,'GET')
}
export default getFavList