// pages/home/index.js
let app = getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.navObj.height,
    top: app.navObj.top,
    bgColor: app.bgColor,
    cs:{},
    tq:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    // 获取地理位置
    wx.getSetting({
      success:function(res){
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        t.initTianQi(t,longitude + ',' + latitude)
      },
      fail:(res)=>{
        Notify({type:'warning', message: '用户拒绝获取位置信息,使用默认位置',duration: 3000})
        t.initTianQi(t,app.defaultCity)
      }
    })
  },
  initTianQi:(t,localhost)=>{
    // 获取当前城市位置
    let tq = ''
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?location='+localhost+'&key=c5e46449a8d349c09e9de5e6c09b1eeb&gzip =y',
      success:(res)=>{
        t.setData({cs: res.data.location[0]})
        app.cs = res.data.location[0]
        // 接着获取当前城市天气信息
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?location='+res.data.location[0].lon+','+res.data.location[0].lat+'&key=c5e46449a8d349c09e9de5e6c09b1eeb&gzip=y',
          success:(res2)=>{
            t.setData({tq: res2.data.now})
          }
        })
      }
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