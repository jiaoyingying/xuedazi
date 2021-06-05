// pages/pinyinDetail/pinyinDetail.js
const innerAudioContext = wx.createInnerAudioContext()
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zimu:{},
    id:1,
    left:1,
    right:24,
    cid:null,
    isTiptrue:true
  },
  setZimu(res){
    console.log(res)
    this.setData({
      zimu:res.data[0]
    })
    this.yinpin(res.data[0].src)
  },
  getLetter:function(e){
    console.log(e);
    let id=e;
    let dt={};
    dt.lid=id;
    util.myrequest(dt,getApp().globalData.url_0+"getLetter").then(this.setZimu);
  },
  shang:function(e){
    let id0=e.currentTarget.id;
    console.log(id0)
    if(id0==this.data.left)
    {
      wx.showToast({
        title: '已到第一个',
        icon:'error',
      })
    }
    else{
      let id=parseInt(id0)-1
      this.getLetter(id)
      this.setData({
        id:parseInt(id0)-1
      })
    }
  },
  xia:function(e){
    let id0=e.currentTarget.id;
    console.log(id0)
    if(id0==this.data.right)
    {
      wx.showToast({
        title: '已到最后一个',
        icon:'error',
      })
    }
    else{
      let id=parseInt(id0)+1
      this.getLetter(id)
      this.setData({
        id:parseInt(id0)+1
      })
    }
  },
  yinpin:(e)=>{
    let src=e;
    console.log(src)
    innerAudioContext.autoplay = true
    innerAudioContext.src = src;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  closeThis:function(e){
    console.log("dianjile")
    wx.setStorage({
      key: 'PydetailOpen',
      data: 'OpenTwo'
    })
    this.setData({
      isTiptrue:false
    })
    this.getChar()
  },
  getChar:function(){
    let cid=this.data.cid
    if(cid==0){
      this.getLetter(this.data.id)
    }
    else if(cid==1){
      this.setData({
        id:32,
        left:32,
        right:55
      })
      this.getLetter(32)
    }
    else if(cid==2){
      this.setData({
        id:56,
        left:56,
        right:71
      })
      this.getLetter(56)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const{cid}=options;
    console.log(cid)
    this.setData({
      cid:cid
    })
    let firstOpen = wx.getStorageSync("PydetailOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    this.getChar();
    }
  },
  audioPlay: function () {
    innerAudioContext.play()
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