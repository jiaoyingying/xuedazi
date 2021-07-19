// pages/dazi/dazi.js
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:{
      name:"单字练习"
    },
    isCollect:false,//是否被收藏
    inputvalue:'',
    id:1,
    characters:{},
    left:1,
    right:3262,
    flag:false,
    defaultType: true,
    passwordType:true,
    storetType:true,
    storeN:[],
    isTiptrue:true,
    src:"https://jiaoyy2020.xyz/success.mp3",
    buttonClicked:false
  },
  setChar(res){
    //console.log(res)
    if(res.status==100){
      util.login().then(this.getrequest);
    }
    else if(res.status==200){
    let collectChar=wx.getStorageSync('collectChar')||[];
    //判断是否被收藏
    let isCollect=collectChar.some(v=>v.id===res.data[0].id)
    this.setData({
      characters:res.data[0],
      defaultType:true,
      passwordType:true,
      inputvalue:'',
      isCollect:isCollect
    })
  }
  },
  getHanzi:function(e){
    //console.log(e);
    this.setData({
      id:parseInt(e)
    })
    this.getrequest()
  },
  getrequest:function(){
    let dt={};
    dt.lid=this.data.id;
    util.myrequest(dt,getApp().globalData.url_0+"getHanzi").then(this.setChar);
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
    util.buttonClicked(this);
    let id0=e.currentTarget.id;
    //console.log(id0)
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
    util.buttonClicked(this);
    let id0=e.currentTarget.id;
    //console.log(id0)
    this.getXia(id0)
  },
  closeThis:function(e){
    //console.log("dianjile")
    wx.setStorage({
      key: 'DaziOpen',
      data: 'OpenTwo'
    })
    this.setData({
      isTiptrue:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let firstOpen = wx.getStorageSync("DaziOpen")
    //console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    }
    let {id}=options;
    if(id==undefined)
    {
      id = parseInt(Math.random() * parseInt(this.data.right) + 1);
    }
    //console.log(id);
    this.getHanzi(id);

  },
  check:function(e){
    //console.log(e.detail.value)
    if(e.detail.value.length==1)
    {
    if(e.detail.value!=this.data.characters.hanzi)
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
      //音乐声
      this.audioPlay();
      wx.showToast({
        title: '正确',
        icon:'success'
      })
      this.getXia(this.data.id)
    }
    }
  },
  audioPlay: function () {
    console.log("shengyin")
    this.audioCtx.play()
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
//收藏，
/*
1、onshow加载缓存中的商品数据
2、判断当前商品是否被收藏 是，改变图标
3、点击收藏 
    判断当前商品是否存在于缓存数组中，已存在，则删除
    不存在，则加入到缓存中
*/
store:function()
{
  let isCollect=false;
  let collectChar=wx.getStorageSync('collectChar')||[];
  let index=collectChar.findIndex(v=>v.id===parseInt(this.data.id))
  //console.log(collectChar)
  if(index!==-1)
  {
    collectChar.splice(index,1);
    isCollect=false;
    wx.showToast({
      title: '取消成功',
      mask:true
    })
  }else{
    let obj={};
    obj.id=parseInt(this.data.id);
    obj.hanzi=this.data.characters.hanzi
    obj.pinyin=this.data.characters.pinyin
    collectChar.push(obj);
    isCollect=true;
    wx.showToast({
      title: '收藏成功',
      mask:true
    })
  }
  wx.setStorageSync('collectChar', collectChar);
  this.setData({
    isCollect
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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
    //切换到其他页面时，将收藏的东西写入数据库
    //console.log("onUnload")
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