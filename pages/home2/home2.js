// pages/home2/home2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navilist:[]
  },
  list1:[{
      mysrc:"/image/newicon/shengmucard.png",
      myurl:"/pages/pinyinDetail/pinyinDetail?cid=0"
    },{
      mysrc:"/image/newicon/yunmucard.png",
      myurl:"/pages/pinyinDetail/pinyinDetail?cid=1"
    },{
      mysrc:"/image/newicon/zhengtirenducard.png",
      myurl:"/pages/pinyinDetail/pinyinDetail?cid=2"
    }
  ],
  list2:[{
    mysrc:"/image/newicon/shengmucard.png",
    myurl:"/pages/dazi/dazi"
  },{
    mysrc:"/image/newicon/shengmucard.png",
    myurl:"/pages/daIdiom/daIdiom"
  },{
    mysrc:"/image/newicon/shengmucard.png",
    myurl:"/pages/test/test"
  }],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id==1)
    {
      this.setData({
        navilist:this.list1
      })
    }
    else if(options.id==2){
      this.setData({
        navilist:this.list2
      })
    }
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