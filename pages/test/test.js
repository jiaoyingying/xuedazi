// pages/test/test.js
const util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa: {
      "name": "限时挑战"
    },
    timer:1,
    testSentence : [
      {content:"最孤独的时光，会塑造最坚强的自己!"},
  ],
  right:95,
  restart_flag:true,//重新开始按钮是否隐藏
  startIndex:0,
  textContent:"点击下放文本输入框开始打字！！！",
  testTime:60,
  timeLeft:0,
  timeElapsed :0,//已用时间
  errors : 0,//错误统计
  total_errors : 0,
  accuracy :0,//正确个数
  characterTyped : 0,//总打字数
  startIndex : 0,//默认开始是索引为0,
  textarea_box_flag : false,
  textarea_box_value:'',
  currcorrect_text:100,
  time_text:'',
  type_speed_flag : true,//打字速度框是否显示
  type_speed_text:0,
  error_text:0
  },
//更新渲染句子
updateSentence:function(){
  this.setData({
    textContent:null,
  })
  let startIndex=this.data.startIndex;
  let testSentence=this.data.testSentence||[];
  let currentSentence = testSentence[startIndex].content;
  //句子拆分
  var newChar = currentSentence.split('');
  let text=[];
  for(var i = 0; i < newChar.length; i++){
     // text.push(newChar[i]);
      let tmp={};
      tmp.char=newChar[i];
      tmp.flag=0;
     text.push(tmp)
  }
  if(startIndex < testSentence.length - 1){
      startIndex++;
  }else{
      startIndex = 0;
      //重新获取5个句子，并更新到testSentence中
      let id=parseInt(Math.random() * parseInt(this.data.right) + 1); //id应该是1-96的随机数
      let dt={}
      dt.id=id;
      util.myrequest(dt,getApp().globalData.url_0+"getText").then((res)=>{
        //console.log(res);
        this.setData({
          testSentence:res.data,
        })
      })
  }
  this.setData({
    startIndex,
    textContent:text,
  })
},
//输入当前正确的句子
processCurrentText: function(e){
  let  curr_input = e.detail.value;
  let curr_input_array = curr_input.split('');
  // //console.log(curr_input_array);
  this.data.characterTyped++;
  //this.data.errors = 0;
  let errors=0
  let quoteSpanArray = this.data.textContent;
  quoteSpanArray.forEach((ch,index)=>{
      var typeChar = curr_input_array[index];
      //当前没有输入
      if(typeChar == null){
          ch.flag=0; 
      }else if(typeChar === ch.char){
          //正确的输入
          ch.flag=1 ;
      }else{
          //不正确的输入
         ch.flag=2;
         //this.data.errors++; 
         errors++;
      }
  })
  let error_text = this.data.total_errors + errors; 
  //console.log( this.data.characterTyped)
  ////console.log(error_text)
  var correctCharacters = ( this.data.characterTyped - (this.data.total_errors + errors)); 
  var accuracyVal = ((correctCharacters /  this.data.characterTyped) * 100); 
  if(accuracyVal<0)
    accuracyVal=0;
  ////console.log(accuracyVal)
  let currcorrect_text = Math.round(accuracyVal); 
  this.setData({
    currcorrect_text,
    error_text:error_text,
    errors,
    textContent:quoteSpanArray
  })
  //输入结束
  if(curr_input.length == quoteSpanArray.length){
      this.updateSentence(); 
      let total_errors= this.data.total_errors+ errors; 
      this.setData({
        total_errors,
        textarea_box_value:""
      })
  }
},
//开始游戏
startGame:function (){
  this.resetValues(); 
  this.updateSentence(); 

  // clear old and start a new timer 
  clearInterval(this.data.timer); 
  let timer = setInterval(this.updateTimer, 1000); 
  this.setData({
    timer
  })
},
//重新开始
resetValues: function (){
 /// text_box.textContent = 'Click on the area below to start the game.'; 
  this.setData({
    restart_flag:true,
    timeLeft:this.data.testTime,
    timeElapsed :0,//已用时间
    errors : 0,//错误统计
    total_errors : 0,
    accuracy :0,//正确个数
    characterTyped : 0,//总打字数
    startIndex : 0,//默认开始是索引为0,
    textarea_box_flag : false,
    textarea_box_value:'',
    currcorrect_text:100,
    time_text:this.data.timeLeft + 's',
    type_speed_flag : true,//打字速度框是否显示
    error_text:0
  })
  
},
//更新时间
updateTimer:function () { 
  let timeLeft=this.data.timeLeft;
  let timeElapsed=this.data.timeElapsed;
  let time_text=this.data.time_text;
  if (timeLeft > 0) { 
    // decrease the current time left 
    timeLeft--; 
    // increase the time elapsed 
    timeElapsed++; 
    // update the timer text 
    time_text= timeLeft + "s"; 
    this.setData({
      timeLeft,
      timeElapsed,
      time_text
    })
  } 
  else { 
    // finish the game 
    this.finishGame(); 
  } 
} ,
//游戏结束
finishGame :function () { 
  // stop the timer 
  clearInterval(this.data.timer); 

  // disable the input area 
  //textarea_box.disabled = true; 
  //


  // show finishing text 
  //text_box.textContent = "可点击下方按钮重新开始！！！"; 

  // display restart button 
  //restart.style.display = "block"; 

  // calculate cpm and wpm 
  //console.log(this.data.characterTyped,this.data.timeElapsed)
  let cpm = Math.round(((parseFloat(this.data.characterTyped) /parseFloat(this.data.timeElapsed)) * 60)); 

  // update cpm and wpm text 
  
  let  type_speed_text = cpm ; 
  this.setData({
    textarea_box_flag:true,
    textContent:this.InitTextcontent("点击下方按钮重新开始！！！"),
    restart_flag:false,
    type_speed_text,
    type_speed_flag:false,
  })

  // display the cpm and wpm 
  //type_speed_flag = true; 
  
},
//初始化绿色框体中的字
InitTextcontent:function(e){
  let text=e;
  let n=text.length;
  let textContent=[];
  for(var i=0;i<n;i++)
  {
    let tmp={};
    tmp.char=text[i];
    tmp.flag=0;
    textContent.push(tmp);
  }
  return textContent;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let text="点击下方按钮开始游戏！"
    let textContent=this.InitTextcontent(text);
    this.setData({
      textContent,
      textarea_box_flag:true
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