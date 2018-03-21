const app = getApp();
var timer
var second = 0;
var partSecond=0;
var brewTime;
var totalSecond = 0;
var totalTime = 0;
var partTime=0;
var preStopBrew = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partPercent: 0,
    second: 0,
    partSecond:0,
    startHide:false,
    stopBrewHide:true,
    stopHide:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    brewTime = parseInt(options.brewTime.split(":")[0])*60 + parseInt(options.brewTime.split(":")[1]);
    totalTime = parseInt(options.totalTime.split(":")[0])*60+ parseInt(options.totalTime.split(":")[1]);
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
    
  },

  startTimer: function () {
    console.log("开始按钮");
    clearTimeout(timer);
    
    this.setData({
      second: 0,
      brewPercent: 0,
      brewSecond:0,
      totalSecond: 0,
      totalPercent: 0,
      startHide:true,
      stopBrewHide:false,
    })
    second = 0;
    partSecond =0;
    totalSecond = 0;
    partTime = brewTime;
    Countdown(this);
  },

  stopBrewTimer:function(){
    console.log("完成焖蒸按钮");
    this.setData({
      partPercent: 0,
      partSecond:0,
      startHide: true,
      stopBrewHide: true,
      stopHide:false,
    });
    partSecond = 1;
    partTime = totalTime - brewTime;
    preStopBrew = true;
    
  },
  
  stopTimer:function(){
    console.log("完成注水按钮");
    clearTimeout(timer);

  }

})

function Countdown(that) {
  if (second == brewTime && preStopBrew==false) {
    console.log("Brew Times up...");
    that.setData({
      partPercent: 0,
      stopBrewHide: true,
      stopHide: false,
    });
    partSecond=0;
    partTime = totalTime - brewTime;
  }
  
  if(second == totalTime){
    console.log("total Times up...");
  }

  second++;
  partSecond++;
  timer = setTimeout(function () {
    console.log("----Countdown----",partSecond,partTime);
    that.setData({
      partPercent: partSecond / partTime * 100,
      second: second,
      partSecond:partSecond,
    });
    Countdown(that);
  }, 1000);
};

function Countdown2(that) {
  that.setData({
    totalPercentHide:false
  })
  var extraSecond = totalCountSecond - countSecond;
  if (totalSecond == extraSecond) {
    console.log("Total time up...");
    that.setData({
      totalPercent: 100
    });
    return;
  }
  totalSecond++;
  timer = setTimeout(function () {
    console.log("----Countdown2----");
    that.setData({
      totalPercent: totalSecond / extraSecond * 100,
      totalSecond: totalSecond,
    });
    Countdown2(that);
  }, 1000);
};