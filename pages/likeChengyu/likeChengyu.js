// pages/likeChengyu/likeChengyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:{
      name:"成语收藏",
      color:'#ffffff'
    },
    listData:[
      1,10
    ],
    collectNums:0,
    cid:0,
    newurl:"",
  
  },
  max:15,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cid=options.cid;
    this.setData({
      cid:cid
    })
    console.log("onload");
    if(cid==0)
    {
      //学习记录
      this.setData({
        aa:{
          name:"错题记录",
          color:'#ffffff'
        },
      })
    }else if(cid==1){
      //单字收藏
      this.setData({
        aa:{
          name:"单字收藏",
          color:'#ffffff'
        },
      })
    }else if(cid==2){
    //词语收藏
    this.setData({
      aa:{
        name:"词语收藏",
        color:'#ffffff'
      },
    })
   }else{
    //成语收藏
    this.setData({
      aa:{
        name:"成语收藏",
        color:'#ffffff'
      },
    })
   }
  },
  review(){
    wx.redirectTo({
      url: '/pages/review/review?cid='+this.data.cid,
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
    console.log("onshow");
    if(this.data.cid==1){
      this.setData({
        newurl:"/pages/dazi/dazi"
      })
    const collectChar=wx.getStorageSync('collectChar')||[];
    this.setData({
      collectNums:collectChar.length>this.max?this.max:collectChar.length,
      listData:collectChar
    })
    }else if(this.data.cid==3){
      this.setData({
        newurl:"/pages/daIdiom/daIdiom"
      })
    const collectIdiom=wx.getStorageSync('collectIdiom')||[];
    this.setData({
      collectNums:collectIdiom.length>this.max?this.max:collectIdiom.length,
      listData:collectIdiom
    })
    }
    else if(this.data.cid==2){
      this.setData({
        newurl:"/pages/phrase/phrase"
      })
      const collectphrase=wx.getStorageSync('collectphrase')||[];
      this.setData({
        collectNums:collectphrase.length>this.max?this.max:collectphrase.length,
        listData:collectphrase
      })
      }else{
        //学习记录
        this.setData({
          newurl:"/pages/game/game"
        })
      const record=wx.getStorageSync('record')||[];
      this.setData({
        collectNums:record.length>this.max?this.max:record.length,
        listData:record
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