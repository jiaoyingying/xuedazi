// app.js

const util=require("./utils/util.js")
App({
  globalData: {
    userInfo: null,
    url_0:"https://www.jiaoyy2020.xyz:3389/",
    //url_0:"http://127.0.0.1:3000/",
    token:null,
    score:0,
    charList:[],
    idiomList:[]
  },
  onLaunch() {

    if(this.globalData.token==null)
    {
      util.login().then(this.getLike);
    }
    else{
      this.getLike();
    }
  },
  setMydata:function(res){
    console.log(res)
    if(res.data!=null)
    {
      this.globalData.charList=res.data[0].char_list;
      this.globalData.idiomList=res.data[0].char_list;
    }
    wx.setStorage({
      key:"charList",
      data:this.globalData.charList
    },{
      key:"idiomList",
      data:this.globalData.idiomList
    }
    )
  },
  getLike:function(){
    try {
      var value = wx.getStorageSync('charList')
      if (value) {
        // Do something with return value
        this.globalData.charList=value;
      }
      else{
        let url=this.globalData.url_0+"getLikelist";
        console.log(url)
        util.myrequest(null,url).then(this.setMydata)
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  }
})
