const app = getApp();
var timer
var second = 0;
var countSecond;
var totalSecond = 0;
var totalCountSecond = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brewPercent: 0,
    second: 0,
    totalPercent: 0,
    totalSecond: 0,
    startHide:false,
    stopHide:true,
    brewPercentHide:false,
    totalPercentHide:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    countSecond = parseInt(options.brewTime.split(":")[0])*60 + parseInt(options.brewTime.split(":")[1]);
    totalCountSecond = parseInt(options.totalTime.split(":")[0])*60+ parseInt(options.totalTime.split(":")[1]);
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
      totalSecond: 0,
      totalPercent: 0,
      startHide:true,
      stopHide:false,
    })
    second = 0;
    totalSecond = 0;
    Countdown(this);
  },

  stopTimer:function(){
    console.log("完成焖蒸按钮");
    clearTimeout(timer);
    this.setData({
      totalSecond: 0,
      totalPercent: 0,
      startHide: false,
      stopHide: true,
    })
    totalSecond = 0;
    Countdown2(this);
  }

})

function Countdown(that) {
  if (second == countSecond) {
    console.log("Time up...");
    that.setData({
      brewPercent: 100
    });
    Countdown2(that);
    return;
  }
  second++;
  timer = setTimeout(function () {
    console.log("----Countdown----");
    that.setData({
      brewPercent: second / countSecond * 100,
      second: second,
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