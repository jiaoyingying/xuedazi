// app.js
App({
  onLaunch() {
    const util=require("./utils/util.js")
    if(this.globalData.token==null)
    {
      util.login().then()
    }
  },
  globalData: {
    userInfo: null,
    url_0:"https://www.jiaoyy2020.xyz:3389/",
    //url_0:"http://127.0.0.1:3000/",
    token:null,
    score:0
  }
})
