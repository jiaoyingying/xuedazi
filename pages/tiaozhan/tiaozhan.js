// pages/tiaozhan/tiaozhan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTiptrue:true,
    timerflag:false,
    timer: '1',//定时器名字
    countDownNum: 60,//倒计时初始值
    sentence:"只要下定决心，过去的失败，正好是未来行动的借鉴；只要不屈不挠，一时的障碍，正好是推动成功的力量。",
    currcorrect_text:100
  },
 bt:function(){
   this.setData({timerflag:true});
  //启动定时器
  this.countDown();
 },
    onShow: function(){
    },
   
    countDown: function () {
      let that = this;
      let countDownNum = that.data.countDownNum;//获取倒计时初始值
      //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
      that.setData({
        timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
          //每隔一秒countDownNum就减一，实现同步
          countDownNum--;
          //然后把countDownNum存进data，好让用户知道时间在倒计着
          that.setData({
            countDownNum: countDownNum
          })
          //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
          if (countDownNum == 0) {
            //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
            //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
            clearInterval(that.data.timer);
            //关闭定时器之后，可作其他处理codes go here
            wx.showToast({
              title: '时间到',
            })
            that.setData({
              timerflag: false
            })
          }
        }, 1000)
      })
    },
    bindin:function(e){
      console.log(e.detail.value)
    },
    closeThis:function(e){
      console.log("dianjile")
      wx.setStorage({
        key: 'DaOpen',
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
    let firstOpen = wx.getStorageSync("DaOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
      })
    } else {
      this.setData({
        isTiptrue: false,
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