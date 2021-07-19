// pages/paihang/paihang.js
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:{
      name:"排行榜"
    },
    listData:[],
  page:0,//当前页数
  num:60,//每页数量
  maxnum:100,
  id:0
  },
  totalpages:0,
  getNumdata:function(res){
    if(res.status==100)
    {
      //过期了，重新登录
      util.login().then(this.getnums);
    }
    else if(res.status==200){
      //获取总记录数
      let totalnum=res.data.num;
      //获取总页数
      this.totalpages=Math.ceil(totalnum/this.data.num);
      //console.log(this.totalpages);
      this.getListData()
    }
  },
  getListData:function(){
    let data={};
    data.page=this.data.page;
    data.num=this.data.num;
    util.myrequest(data,getApp().globalData.url_0+"getPaihang").then((res)=>{
      let list=res.data||[];
      for(let i of list)
      {
        if(i.name==null)
        {  i.name="匿名用户"
          i.avatarUrl="/image/icon/weixin.png"
        }
        else{
          i.name=this.entitiesToUtf16(i.name);
        }
      }
      res.data=list
      this.setData({
      page:data.page+1,
      listData:[...this.data.listData,...res.data]
    })
    
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getnums:function(){
    util.myrequest(null,getApp().globalData.url_0+"getnums").then(this.getNumdata)
  },
  onLoad: function (options) {
    //获取总人数
    this.getnums();
    let user=wx.getStorageSync('userinfo')
    this.setData({
      id:user.id
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
  //表情转换显示 将字符转换为表情
  entitiesToUtf16(str){
    return str.replace(/&#(\d+);/g, function (match, dec) {
      let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
      let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
      return String.fromCharCode(H, L);
    })
  },
  //表情转为字符
decode: function (str)
  {
    let content=str||"";
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    content = content.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
    H = char.charCodeAt(0); // 取出高位
    L = char.charCodeAt(1); // 取出低位
    code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
    console.log("&#" + code + ";")
    return "&#" + code + ";";
    } else {
      console.log(char)
      return char;
      
    }
    });
    return content;
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //if(this.data.page>=this.totalpages)
    if(this.data.listData.length>105)
    {
      ////console.log("没有下一页")
      wx.showToast({
        title: '仅显示前120名',
      })
    }
    else{
      //console.log("有下一页")
      this.getListData();
      //当前页码++
      //重新发送请求获取下一页
      //数据请求回来进行数组拼接
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})