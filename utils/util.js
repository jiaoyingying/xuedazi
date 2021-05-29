const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function login(){
  let promise = new Promise((resolve,reject)=>{
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: getApp().globalData.url_0+'onLogin',
            method:'POST',
            data: {
              code: res.code
            },
            success (res) {
              //console.log(res.data)
              getApp().globalData.token=res.data.token;
              console.log("login()---token:"+getApp().globalData.token)
              resolve()
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
  return promise;
}
function myrequest(e,url0){
  let promise = new Promise((resolve,reject)=>{
    wx.request({
      url: url0, 
      header: {
        'content-type': 'application/json' ,// 默认值
        'token':getApp().globalData.token
      },
      method:"POST",
      data: {
        value:e
      },
      success (res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
  })
  return promise;
}

module.exports = {
  formatTime,
  login,
  myrequest
}