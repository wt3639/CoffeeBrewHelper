//index.js
//获取应用实例
const app = getApp()
var timer
var second = 0;
var countSecond;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),


    array: ['哥伦比亚', '耶加雪菲', '肯尼亚', '哥斯达黎加', '巴拿马','云南','巴西','蓝山','曼特宁','危地马拉','添加豆子'],
    index:0,
    grindArray: ['粗粉', '中粉', '中细粉', '细粉', '极细粉'],
    grindIndex: 2,
    brewTime:'00:30',
    TotalTime:'00:50',
    waterTem:92,
    brewPercent:0,
    second: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindCoffeeNameChange: function (e) {
    console.log('咖啡豆修改为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

bindGrindChange:function(e){
console.log('研磨程度修改为',e.detail.value)
this.setData({
  grindIndex:e.detail.value
})
},


  bindWaterTemChange:function(e){
    console.log('水温发送选择改变，携带值为', e.detail.value)
    this.setData({
      waterTem:e.detail.value
    })
  },

bindBrewTimeChange: function (e) {
    console.log('焖蒸时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      brewTime: e.detail.value
    })
  },

bindTotalTimeChange: function (e) {
  console.log('总时间发送选择改变，携带值为', e.detail.value)
  this.setData({
    TotalTime: e.detail.value
  })
},

bindTotalTimeChange: function (e) {
  console.log('总时间发送选择改变，携带值为', e.detail.value)
  this.setData({
    TotalTime: e.detail.value
  })
},

startTimer:function(){
  console.log("开始按钮");
  clearTimeout(timer);
  countSecond = parseInt(this.data.brewTime.split(":")[1]);
  this.setData({
    second:0,
    brewPercent: 0
  })
  second=0;
  Countdown(this);
},



})


function Countdown(that) {
  if (second == countSecond) {
     console.log("Time up...");
    that.setData({
      brewPercent: 100
    });
    return;
  }
  second++;
  timer = setTimeout(function () {
    console.log("----Countdown----");
    that.setData({
      brewPercent: second / countSecond*100,
      second:second,
    });
    Countdown(that);
  }, 1000);
};