function uploadFile(cloudPath,filePath){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '上传文件中',
    })
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success:res=>{
        wx.hideLoading({})
        resolve(res.fileID);        // resolve 文件id
      },
      fail:err=>{
        wx.hideLoading({})
        wx.showToast({
          title: '上传失败',
          icon:'loading',
          duration:1500
        });
        reject(err)
      }
    })
  })
};

function downloadFile(fileID){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '下载文件中',
    });
    wx.cloud.downloadFile({
      fileID,
      success: res => {
        wx.hideLoading({})
        resolve(res.tempFilePath)        // resolve 临时文件地址
      },
      fail: err => {
        wx.hideLoading({})
        wx.showToast({
          title: '下载失败',
          icon:'loading',
          duration:1500
        });
        reject(err)
      }
    })
  })
}

module.exports={
  downloadFile,
  uploadFile
}





// downloadFile('cloud://skyworth-competition-ssvtw.736b-skyworth-competition-ssvtw-1303862399/swiper/华教杯.jpg').then(res=>{
//       console.log(res)
//       wx.downloadFile({
//         url: res,
//         success:res=>{
//           console.log(res);
//           wx.previewImage({
//             current:res.tempFilePath,
//             urls:[res.tempFilePath]
//           })
//         }
//       })
//     })