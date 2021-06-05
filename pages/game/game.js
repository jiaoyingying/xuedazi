// pages/game/game.js
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    pageX:0,
    pageY:0,
    choice:[{x:100,y:130},{x:225,y:130},{x:225,y:360},{x:100,y:360}],
    characters:{
      pinyin:"cha",
      hanzi:"茶",
      shengmu:'ch',
      yunmu:'a'
    },
    pinyinchoices:["chai","cha","chao","chan"],
    score:0,
    colorflag:false,
    shengmu:[['b','p','d','q'],['f','t','w','y'],['n','m','l','r'],['zh','ch','z','c'],['s','sh','x','j'],['g','k','h','d']],
    yunmu:[['a','ai','an','ang'],['e','ei','ie','er'],['o','ao','ong','ou'],['i','in','ing','eng'],['v','u','ui','iu'],['en','un','vn','ve']]
  },
  setChar(res){
    console.log(res)
    this.setData({
      characters:res.data[0],
      x:0,
      y:0,
      colorflag:false
    })
    this.getChoice()
  },
  getHanzi:function(){

    let id=parseInt(Math.random() * 4598 + 1);
    let dt={};
    dt.lid=id;
    util.myrequest(dt,getApp().globalData.url_0+"getHanzi").then(this.setChar);
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
    console.log(choice)
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
    let id = parseInt(Math.random() * 4598 + 1);
    this.getHanzi(id);
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
    console.log('pageX: ' + pageX) 
    console.log('pageY: ' + pageY)
  },
  moveEnd:function(e){
    var touchs = e.changedTouches[0]; 
    var pageX = touchs.pageX; 
    var pageY = touchs.pageY; 
    let choice=this.data.choice
    if(pageX<=choice[0].x&&pageY<=choice[0].y)
    {
      this.check(0);
      console.log("zuo shang")
    }   
    else if(pageX>=choice[1].x&&pageY<=choice[1].y)
    {
      this.check(1);
      console.log("zuo shang")
    }   
    else if(pageX>=choice[2].x&&pageY>=choice[2].y)
    {
      this.check(2);
      console.log("zuo shang")
    }   
    else if(pageX<=choice[3].x&&pageY>=choice[3].y)
    {
      this.check(3);
      console.log("zuo shang")
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onhide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let score=this.data.score;
    //将分数写入数据库
    let data={};
    data.score=score;
    getApp().globalData.score=score;
    wx.setStorageSync('score', score)
    util.myrequest(data,getApp().globalData.url_0+"updateScore")
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