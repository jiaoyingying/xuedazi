// pages/paihang/paihang.js
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[{
      avatarUrl:"../../image/icon/1.jpg",
      name:"平生如故",
      score:50
    },{
      avatarUrl:"../../image/icon/2.jpg",
      name:"山外青山",
      score:44
    },
    {
      avatarUrl:"../../image/icon/6.jpg",
      name:"云淡风轻",
      score:35
    },
    {
      avatarUrl:"../../image/icon/7.jpg",
      name:"海纳百川",
      score:30
    },
    {
      avatarUrl:"../../image/icon/3.jpg",
      name:"七小时",
      score:13
    },
    {
      avatarUrl:"../../image/icon/4.jpg",
      name:"litte",
      score:7
    },
  ],
  page:0,//当前页数
  num:15,//每页数量
  },
  totalpages:0,
  getNumdata:function(res){
    //获取总记录数
    let totalnum=res.data.num;
    //获取总页数
    this.totalpages=Math.ceil(totalnum/this.data.num);
    console.log(this.totalpages);
  },
  getListData:function(){
    let data={};
    data.page=this.data.page;
    data.num=this.data.num;
    util.myrequest(data,getApp().globalData.url_0+"getPaihang").then((res)=>{this.setData({
      page:data.page+1,
      listData:[...this.data.listData,...res.data]
    })})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const res=util.myrequest(null,getApp().globalData.url_0+"getnums").then(this.getNumdata)
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
    if(this.data.page>=this.totalpages)
    {
      //console.log("没有下一页")
      wx.showToast({
        title: '没有下一页了',
      })
    }
    else{
      console.log("有下一页")
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