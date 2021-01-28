import httpRequest from '../../utils/httpRequest'
function getValNum2(email){
  let url = '/api/auth/sendValidationCode'
  let params = {
    email: email,
    sendFor: '2'
  }
  return httpRequest(true, url, 4, wx.getStorageSync('sessionId'), params, 'POST')
}

function resetPassword(params){
  let registerUrl = '/api/auth/resetPassword'
  return httpRequest(true,registerUrl,4,wx.getStorageSync('sessionId'),params,'POST')
}

module.exports = {
  getValNum2: getValNum2,
  resetPassword: resetPassword
}