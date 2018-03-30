const app = getApp();
var coffeeRecordFinal = {
  Date: null,
  coffeeName: "",
  grindIndex: 0,
  waterTemp: 0,
  powderM: 0,
  waterM: 0,
  brewTime: 0,
  totalTime: 0,
  sourIndex: 0,
  sweetIndex: 0,
  bitterIndex: 0,
  rate: 0,
  context: "",
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grindArray: ['粗粉', '中粉', '中细粉', '细粉', '极细粉'],
    coffeeBean: '',
    grindIndex: 0,
    waterTemp: 0,
    powderM: 0,
    waterM: 0,
    realBrewTime: '',
    realTotalTime: '',
    sourIndex: 1,
    sweetIndex: 1,
    bitterIndex: 1,
    rate: 1,
    context: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      coffeeBean: decodeURI(options.coffeeBean),
      grindIndex: options.Grind,
      waterTemp: options.waterTem,
      powderM: options.coffeePowderMass,
      waterM: options.waterMass,
      realBrewTime: options.brewTime,
      realTotalTime: options.totalTime,
    })
    coffeeRecordFinal.coffeeName = decodeURI(options.coffeeBean);
    coffeeRecordFinal.brewTime = options.brewTime;
    coffeeRecordFinal.grindIndex = options.Grind;
    coffeeRecordFinal.powderM = options.coffeePowderMass;
    coffeeRecordFinal.totalTime = options.totalTime;
    coffeeRecordFinal.waterM = options.waterMass;
    coffeeRecordFinal.waterTemp = options.waterTem;
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
  


  formSubmit:function(e){
    coffeeRecordFinal.sourIndex = e.detail.value.sourIndex;
    coffeeRecordFinal.sweetIndex = e.detail.value.sweetIndex;
    coffeeRecordFinal.bitterIndex = e.detail.value.bitterIndex;
    coffeeRecordFinal.rate = e.detail.value.rate;
    coffeeRecordFinal.context = e.detail.value.context;
    coffeeRecordFinal.Date = new Date().toLocaleString();
    console.log(coffeeRecordFinal);
    app.globalData.coffeeRecordArray = wx.getStorageSync("recorde") || []
    app.globalData.coffeeRecordArray.unshift(coffeeRecordFinal);
    console.log(app.globalData.coffeeRecordArray);
    wx.setStorageSync("recorde", app.globalData.coffeeRecordArray);
    wx.reLaunch({
      url: '../index/index',
    })
  },
  sourSliderchange:function(e) {
    console.log("sourChange to " + e.detail.value)
    this.setData({
      sourIndex: e.detail.value
    })
  },
  sweetSliderchange: function (e) {
    console.log("sweetChange to " + e.detail.value)
    this.setData({
      sweetIndex: e.detail.value
    })
  },
  bitterSliderchange: function (e) {
    console.log("bitterChange to " + e.detail.value)
    this.setData({
      bitterIndex: e.detail.value
    })
  },
  rateSliderchange: function (e) {
    console.log("rateChange to " + e.detail.value)
    this.setData({
      rate: e.detail.value
    })
  },
  
})