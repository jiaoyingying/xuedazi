// pages/game/game.js
const util=require("../../utils/util.js")
const netUtils=require("../../utils/netUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:{
      "name": "趣味游戏",
    },
    x: 0,
    y: 0,
    s_pageX:0,
    s_pageY:0,
    pageX:0,
    pageY:0,
    choice:[{x:200,y:420},{x:225,y:200},{x:225,y:420},{x:200,y:420}],
    characters:{},
    pinyinchoices:[],
    score:0,
    colorflag:false,
    shengmu:[['b','p','d','q'],['f','t','w','y'],['n','m','l','r'],['zh','ch','z','c'],['s','sh','x','j'],['g','k','h','d']],
    yunmu:[['a','ai','an','ang'],['e','ei','ie','er'],['o','ao','ong','ou'],['i','in','ing','eng'],['v','u','ui','iu'],['en','un','vn','ve']],
    movableFlag:false
  },
  setChar(res){
    this.setData({
      movableFlag:false
    })
    console.log(res)
    if(res.status==100)
    {
      util.login().then(this.getHanzi);
    }
    else{
    this.setData({
      characters:res.data[0],
      x:0,
      y:0,
      colorflag:false
    })
    this.getChoice()
  }
  },
  resolvefail:function () {
    this.setData({
      movableFlag:true
    })
    wx.showModal({
      title: '提示',
      content: '网络状况差，请重试',
      success (res) {
      if (res.confirm) {
      console.log('用户点击确定');
      this.getHanzi();
      } else if (res.cancel) {
      console.log('用户点击取消')
      }
      }
      })
  },
  getHanzi:function(k){
    console.log(k);
    let id=parseInt(Math.random() * 3262 + 1);
    if(k!=undefined)
      id=parseInt(k)
    let dt={};
    dt.lid=id;
    util.myrequest(dt,getApp().globalData.url_0+"getHanzi").then(this.setChar,this.resolvefail);
  },
  indexOf:function(e,k){
    let i=0;
    for(;i<4;i++)
    {
      if(e[i]==k)
        return i;
    }
    return -1;
  },
  getChoice:function(e){
    let i=0,j=0;
    let s=this.data.characters.shengmu;
    let y=this.data.characters.yunmu;
    let shengmu=[];
    shengmu=this.data.shengmu;
    let yunmu=this.data.yunmu;
    let choice=[];
    let suiji=Math.floor(Math.random()*3);//获取0-3随机数
    for(;i<6;i++)
    {
      if(this.indexOf(yunmu[i],(y))!=-1)
      {
        let l=yunmu[i].indexOf(y)
        if(suiji==3)
          break;
        else{
          let k=0;
          for(k=0;k<3-suiji;k++)
          {
            l=(l+1)%(yunmu[i].length);
            choice[j++]=s+yunmu[i][l];
          }
        }
        break;
      }  
    }
    //console.log(choice)
    suiji=suiji+(3-suiji-choice.length)
    i=0;
    for(;i<6;i++)
    {
      if(this.indexOf(shengmu[i],s)!=-1)
      {
        let l=shengmu[i].indexOf(s)
        if(suiji==0)
          break;
        else{
          let k=0;
          for(k=0;k<suiji;k++)
          {
            l=(l+1)%(shengmu[i].length);
            choice[j++]=shengmu[i][l]+y;
          }
        }
        break;
      }
    }
    choice[j++]=this.data.characters.pinyin;
    this.setData({
      pinyinchoices:this.shuffle(choice)
    })
  },
  //洗牌函数
getRandomInt:function(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  //Math.random()返回0-1之间的小数
shuffle:function(arr) {
    for (let i = 0; i < arr.length; i++) {
      let j = this.getRandomInt(i, 0)
      let t = arr[i]
      arr[i] = arr[j]
      arr[j] = t
    }
    return arr
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id!=undefined)
    {
      console.log("lll")
      this.getHanzi(options.id);
    }
    else{
      console.log("bbb")
      this.getHanzi();
    }
    var that=this;
    netUtils.judgeNetworkStatus(function (res) {
    //none 是无网络状态下，networkType 的值
    if ("none" != res) {
      //有网了，干你要干的事儿吧
      wx.showToast({
        title: '请拖动试试',
        icon:'success'
      })
      
      let score=wx.getStorageSync('score');
      if(!score)
      {
        score=0;
        //console.log("kongde1")
      }  
      that.setData({
        score:score,
      })
    } else {
      wx.showLoading({
        title: '网络状况差',
        mask:true
      })
      return;
    }
  })
  },
  check:function(i){
    i=parseInt(i);
    if(this.data.pinyinchoices[i]==this.data.characters.pinyin)
    {
      let score=parseInt(this.data.score)+1;
      this.setData({
        score:score,
        colorflag:true
      })
      //获取下一组拼音，和字
      this.getHanzi()
    }
    else{
      let record=wx.getStorageSync('record')||[];
      let index=record.findIndex(v=>v.id===parseInt(this.data.characters.id))
      if(index==-1)
      {
        let obj={};
        obj.id=parseInt(this.data.characters.id);
        obj.hanzi=this.data.characters.hanzi
        obj.pinyin=this.data.characters.pinyin
        record.push(obj);
        wx.setStorageSync('record', record)
      }   
      //
      wx.showToast({
        title: '答错了',
        icon:"error"
      })
    }

  },
  moveStart:function(e){
    var touchs = e.changedTouches[0]; 
    var pageX = touchs.pageX; 
    var pageY = touchs.pageY; 
    console.log('start pageX: ' + pageX) 
    console.log('start pageY: ' + pageY)
    this.setData({
      s_pageX:pageX,
      s_pageY:pageY
    })
  },
  moveEnd:function(e){
    let s=50;
    var touchs = e.changedTouches[0]; 
    var pageX = touchs.pageX; 
    var pageY = touchs.pageY; 
    console.log('end pageX: ' + pageX) 
    console.log('end pageY: ' + pageY)
    let deltx=pageX-this.data.s_pageX;
    let delty=pageY-this.data.s_pageY;
    let choice=this.data.choice
    if(deltx<=-s&&delty<=-s)
    {
      this.check(0);
      console.log("1zuo shang")
    }   
    else if(deltx>=s&&delty<=-s)
    {
      this.check(1);
      console.log("2you shang")
    }   
    else if(deltx>=s&&delty>=s)
    {
      this.check(2);
      console.log("you xia")
    }   
    else if(deltx<=-s&&delty>=s)
    {
      this.check(3);
      console.log("4zuo xia")
    }   
    else
    {
      this.setData({
        x: 0,
        y: 0
      })
    }   
    this.setData({
      x: 0,
      y: 0
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

  paihang(){
    let userflag=wx.getStorageSync('userflag');
    if(userflag){
    wx.redirectTo({
      url: '/pages/paihang/paihang',
    })
  }
    else{
      wx.showModal({
        title: '提示',
        content: '登录后才可查看,',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定');
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
    //console.log("onhide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
    //将分数写入数据库
  updatescore:function(){
    let data={};
    data.score=this.data.score;
    util.myrequest(data,getApp().globalData.url_0+"updateScore").then(this.processDate)
  },
  processDate:function(res){
    wx.setStorageSync('rank', res.data.num)

    if(res.status==100)
    {
      util.login().then(this.updatescore);
    }
  },
  onUnload: function () {
    let score=this.data.score;
    //更新分数
    getApp().globalData.score=score;
    wx.setStorageSync('score', score);
    this.updatescore();
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