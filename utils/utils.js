function checkEmail(email){ // 检查邮箱地址合法性
  let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ // 检查邮箱地址合法性的正则表达式
  if(reg.test(email)){
    return true
  }
  else{
    wx.showToast({
      title: '邮箱地址不合法',
      icon:'none',
      duration: 1000
    })
    return false
  }
}

function findByMatchId(list,id){ // 通过matchId寻找item
  return list.find((element) => (element.matchId == id))
}


const formatNumber = n => { // 日期转化格式化
  n = n.toString()
  return n[1] ? n : '0' + n
}



module.exports = {
  checkEmail: checkEmail,
  formatNumber: formatNumber,
  findByMatchId: findByMatchId
}
