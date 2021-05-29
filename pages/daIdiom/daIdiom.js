// pages/daIdiom/daIdiom.js
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputvalue:'',
    id:0,
    idiom:{iid:1,
      word:"挨肩迭背",
      pinyin:["āi, jiān ,dié ,bèi"],
      abbreviation:"ajdb",
      explanations:"哀悲哀；伤伤害。忧愁而不悲伤，形容感情有节制；另形容诗歌、音乐优美雅致，感情适度。比喻做事没有过头也无不及。",
    },
    left:1,
    right:597,
    flag:false,
    defaultType: true,
    passwordType:true,
    storetType:true,
    storeN:[],
  },
  //初始化页面数据
  setChar(res){
    console.log(res)
    let pinyin=res.data[0].pinyin.split(' ');
    res.data[0].pinyin=pinyin
    this.setData({
      idiom:res.data[0],
      defaultType:true,
      passwordType:true,
      storetType:true,
      inputvalue:''
    })
  },
  getHanzi:function(e){
    console.log(e);
    let id=e;
    let dt={};
    dt.lid=id;
    util.myrequest(dt,getApp().globalData.url_0+"getIdiom").then(this.setChar);
  },
  getShang:function(e){
    let id0=e;
    let id=0;
    if(id0==this.data.left)
    {
      id = parseInt(Math.random() * parseInt(this.data.right) + 1);
    }
    else{
      id=parseInt(id0)-1
    }
    this.getHanzi(id)
    this.setData({
      id:id
    })
  },
  shang:function(e){
    let id0=e.currentTarget.id;
    console.log(id0)
    this.getShang(id0)
  },
  getXia:function(e){
    let id0=e;
    let id=0;
    if(id0==this.data.left)
    {
      id = parseInt(Math.random() * parseInt(this.data.right) + 1);
    }
    else{
      id=parseInt(id0)+1
    }
    this.getHanzi(id)
    this.setData({
      id:id
    })
  },
  xia:function(e){
    let id0=e.currentTarget.id;
    console.log(id0)
    this.getXia(id0)
  },
  //成语解释
  explain:function(e){
    console.log("explain")
    wx.showModal({
      title: '成语释义',
      content: this.data.idiom.explanation,
      success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id}=options;
    if(id==undefined)
    {
      id = parseInt(Math.random() * parseInt(this.data.right) + 1);
    }
    console.log(id);
    this.getHanzi(id);
    this.setData({
      id:id,
    })
  },
  check:function(e){
    console.log(e.detail.value)
    if(e.detail.value!=this.data.idiom.word)
    {
      this.setData({
        flag:true
      })
      //将字颜色变红，上方显示输入错误
      wx.showToast({
        title: '输入错误',
        icon:"error"
      })
    }
    else{
      this.getXia(this.data.id)
    }
  },
  //改变输入框字体颜色
  bindf:function(){
    this.setData({
      flag:false
    })
  },
  //defaultType：眼睛状态   passwordType：密码可见与否状态
  eyeStatus: function(){
    this.data.defaultType= !this.data.defaultType
    this.data.passwordType= !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
  })
},
store:function(e){
  let sT=!this.data.storetType
  console.log(e)
  let storeN=this.data.storeN
  storeN.push(this.data.id)
  this.setData({
    storetType:sT,
    storeN
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