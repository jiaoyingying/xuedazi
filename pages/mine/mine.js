const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank:99,
    userInfo: getApp().globalData.userInfo,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    score:0,
    userflag:false
  },
  onLoad() {
    let userflag=wx.getStorageSync('userflag')
    if(userflag!="")
    {
      this.setData({
        userflag
      })
    }
    
    if (userflag) {
      let userinfo=wx.getStorageSync('userinfo')
      //console.log(userinfo)
      userinfo.nickName=this.entitiesToUtf16(userinfo.nickName);
      this.setData({
        userInfo:userinfo,
        hasUserInfo:true
      })
    }
    else{
      wx.setStorageSync('chance', 5)
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    }
  },
  //更新用户头像等数据信息
  helper:function (res) {
    if(res.status==100)
    {
      //过期了，重新登录，获取token值
      //console.log("过期了")
      util.login().then(this.updateUser)
    }
  },
  //表情转为字符
  decode(str)
  {
    let content=str||"";
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    content = content.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
    H = char.charCodeAt(0); // 取出高位
    L = char.charCodeAt(1); // 取出低位
    code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
    //console.log("&#" + code + ";")
    return "&#" + code + ";";
    } else {
      //console.log(char)
      return char;
      
    }
    });
    return content;
  },
  //表情转换显示 将字符转换为表情
entitiesToUtf16(str){
  return str.replace(/&#(\d+);/g, function (match, dec) {
    let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
    let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
    return String.fromCharCode(H, L);
  })
},
  updateUser:function(){
    //console.log(this.data.userInfo.nickName);
    //将昵称转为字符存储到数据库
    this.data.userInfo.nickName=this.decode(this.data.userInfo.nickName);
    this.data.userInfo.chance=5;
    util.myrequest(this.data.userInfo,getApp().globalData.url_0+"updateUser").then(this.helper);
  },
  getUserProfile(e) { 
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //console.log("dianjile")
    
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync('userinfo', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          userflag:true
        })
        this.updateUser()   
        wx.setStorageSync('userflag', true)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  contact(){
    wx.showModal({
      title:"联系方式",
      showCancel:false,
      content:"邮箱：yang.pan@stu.pku.edu.cn"
    })
  },
  edituser(){
    if(this.data.userflag)
    wx.navigateTo({url:"/pages/edituser/edituser"})
    else{
      let that=this;
      wx.showModal({
        title: '提示',
        content: '登录后才可修改用户信息',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.getUserProfile();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  like(){
    if(this.data.userflag)
    wx.navigateTo({url:"../like/like"})
    else{
      let that=this;
      wx.showModal({
        title: '提示',
        content: '登录后才可查看',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.getUserProfile();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  paihang(){
    if(this.data.userflag)
      wx.navigateTo({url:"../paihang/paihang"})
    else{
      let that=this;
      wx.showModal({
        title: '提示',
        content: '登录后才可查看',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.getUserProfile();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  notice(){
    wx.showModal({
      title:"提示",
      content:"已更新到2.0版本，欢迎您的使用",
      showCancel:false,
      cancelColor: 'cancelColor',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
    let userflag=wx.getStorageSync('userflag')
    let score=wx.getStorageSync('score');
    let rank=wx.getStorageSync('rank')
    if(rank=="")
      rank="9999+"
    this.setData({
      score:score,
      rank:rank
    })
    let that=this;
    if(!userflag)
    {
      wx.showModal({
        title: '提示',
        content: '申请获取您的公开信息（昵称，头像等）',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.getUserProfile();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let userflag=wx.getStorageSync('userflag')
    if (userflag) {
      let userinfo=wx.getStorageSync('userinfo') 
      userinfo.nickName=this.entitiesToUtf16(userinfo.nickName)
      this.setData({
        userInfo:userinfo,
        hasUserInfo:true
      })
    }
    else{
      wx.setStorageSync('chance', 5)
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})