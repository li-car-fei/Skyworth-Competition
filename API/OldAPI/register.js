import httpRequest from '../../utils/httpRequest'
function getValNum1(email){
  let url = '/api/auth/sendValidationCode'
    let params = {
      email: email,
      sendFor: '1'
    }
    return httpRequest(true,url,4,wx.getStorageSync('sessionId'),params,'POST',false)
}
function register(params){
  let registerUrl = '/api/auth/register'
  return httpRequest(true,registerUrl,4,wx.getStorageSync('sessionId'),params,'POST',false)
}

module.exports = {
  getValNum1: getValNum1,
  register: register
}