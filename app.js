// app.js

const util=require("./utils/util.js")
App({
  globalData: {
    userInfo: {nickname:null,avatarUrl:"../../image/icon/default.png"},
    url_0:"https://www.jiaoyy2020.xyz:3389/",
    //url_0:"http://127.0.0.1:3000/",
    token:null,
    score:0,
    globalNetWork:null,
    chance:5
  },
  onLaunch() {
  util.networkManage(); //调用监听网络状态的方法
  this.updateManage(); //调用检测小程序版本更新的方法
  if(this.globalData.token==null)
  {
    util.login().then(this.getUserinfo);
  }
  else{
    this.getUserinfo()
  }
  },
  //获取用户分数，根据token获取整个用户信息，更新本地缓存
  updateUser:function (e) {
    //console.log(e.data[0]);
    console.log(e);
    if(e.data[0].name==""&&e.data[0].avatarUrl=="")
      console.log("kongde")
    else{
      let dt={};
      dt.nickName=e.data[0].name;
      dt.avatarUrl=e.data[0].avatarUrl;
      dt.id=e.data[0].id;
      wx.setStorageSync('userflag', true);
      wx.setStorageSync('userinfo', dt)
    }
    wx.setStorageSync('rank', e.paihang.num);
    wx.setStorageSync('score', e.data[0].score);
    wx.setStorageSync('chance', e.data[0].chance);
  },
  getUserinfo:function() {
    console.log(this.globalData.token)
    //console.log(this.globalData.url_0+"getUserinfo")
    util.myrequest(null,this.globalData.url_0+"getUserinfo2").then(this.updateUser)
  },
    // ---------------------------------------------网络状态 
  
  //---------------------------------------------检测小程序版本更新
  updateManage: function () {
    var that = this;
 
    var updateManager = wx.getUpdateManager()
 
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
      if (!res.hasUpdate) {
 
      }
    })
    // 监听新版本下载成功
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          } else {
            that.updateManage();
          }
        }
      })
    })
    // 监听新版本下载失败
    updateManager.onUpdateFailed(function () {
      app.showModal({
        content: '新版本更新失败，是否重试？',
        confirmText: '重试',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    })
  },//--------end


  
})
