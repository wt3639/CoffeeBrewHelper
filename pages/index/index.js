//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    array: ['哥伦比亚', '耶加雪菲', '肯尼亚', '哥斯达黎加', '巴拿马','云南','巴西','曼特宁','危地马拉','自定义'],
    index:0,
    grindArray: ['粗粉', '中粉', '中细粉', '细粉', '极细粉'],
    grindIndex: 2,
    brewTime:'00:30',
    totalTime:'02:50',
    waterTem:92,
    coffeeBean:'哥伦比亚',
    inputHide:true,
    waterMl:225,
    coffeeG:15,
    biDigit:15.0,
    coffeeFocus:false,
    waterFocus:false,
    tempFocus:false,
    hiddenmodalput:true,
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
    var brewinfo = wx.getStorageSync("brewInfo")
    if(brewinfo){
    this.setData({
      index: brewinfo.coffeeBeanName,
      coffeeBean:brewinfo.coffeeBean,
      grindIndex: brewinfo.Grind,
      brewTime: brewinfo.brewTime,
      totalTime: brewinfo.totalTime,
      waterTem: brewinfo.waterTem,
      coffeeBean: brewinfo.coffeeBean,
      coffeeG:brewinfo.coffeePowderMass,
      waterMl:brewinfo.waterMass,
    })
    }
    var coffeeArray = wx.getStorageSync("coffeeArray")
    if(coffeeArray){
      this.setData({
        array: coffeeArray,
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
    if(e.detail.value == this.data.array.length-1){
      this.setData({
        index: e.detail.value,
        hiddenmodalput:false,
        coffeeBean:''
      })
    }else{
      this.setData({
        index: e.detail.value,
        coffeeBean:this.data.array[e.detail.value],
      })
    }
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
    totalTime: e.detail.value
  })
},

coffeeMChange:function(e){
    this.setData({
      waterMl:(e.detail.value * this.data.biDigit).toFixed(1),
    })
},

waterMChange:function(e){
    this.setData({
      biDigit:(e.detail.value/this.data.coffeeG).toFixed(1),
    })
},

biChange:function(e){
    this.setData({
      waterMl:(this.data.coffeeG * e.detail.value).toFixed(1),
    })
},

coffeeTap:function(){
  this.setData({
    coffeeFocus:true,
  })
},

waterTap:function(){
  this.setData({
    waterFocus:true,
  })
},

tempTap:function(){
  this.setData({
    tempFocus:true,
  })
},

coffeeConfirm:function(){
  if(this.data.coffeeBean){
  this.data.array[this.data.array.length-1]=this.data.coffeeBean;
  this.data.array.push("自定义")
  console.log(this.data.array)
  this.setData({
    hiddenmodalput: true,
    array:this.data.array
  })
  wx.setStorageSync("coffeeArray", this.data.array);
  }else{
    wx.showToast({
      title: '请填入内容',
      icon: 'success',
      duration: 2000
    })
  }
},

coffeCancel:function(){
  this.setData({
    hiddenmodalput: true,
    index:0,
  })
},

inputOver:function(e){
  this.setData({
    coffeeBean:e.detail.value
  })
},

formSubmit: function (e) {
  console.log(e.detail.value)
  if (e.detail.value.coffeeBean.length == 0
    || e.detail.value.coffeePowderMass.length == 0 
    || e.detail.value.waterMass.length == 0) {
    wx.showToast({
      title: '请正确填入表单',
      icon: 'success',
      duration: 2000
    })
  } else {
    var objData = e.detail.value;
    // 同步方式存储表单数据
    wx.setStorageSync('brewInfo', objData)
    console.log(app.openid)
    
    wx.navigateTo({
      url: '../brew/brew?coffeeBean=' + e.detail.value.coffeeBean + '&Grind=' + e.detail.value.Grind + '&waterTem=' + e.detail.value.waterTem + '&coffeePowderMass=' + e.detail.value.coffeePowderMass + '&waterMass=' + e.detail.value.waterMass
      + '&brewTime=' + (parseInt(e.detail.value.brewTime.split(":")[0]) * 60 + parseInt(e.detail.value.brewTime.split(":")[1])) + '&totalTime=' + (parseInt(e.detail.value.totalTime.split(":")[0]) * 60 + parseInt(e.detail.value.totalTime.split(":")[1]))
    }),
      console.log(e.detail.value)
  }

},

toHistory:function(){
  app.globalData.coffeeRecordArray = wx.getStorageSync("recorde")||[]
  wx.navigateTo({
    url: '../history/history'
  });
},
onShareAppMessage: function (res) {
  if (res.from === 'menu') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '手冲咖啡助手',
    path: '/pages/index/index',
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
},
})


