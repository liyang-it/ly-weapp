// pages/me/liyang/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: app.bgColor,
    tianqi: [],
    navHeight: app.navObj.height,
    opacity: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let t = this
    wx.showLoading({
      title: '马上就来喔',
    })
    let tqs = []
    let key = 'c5e46449a8d349c09e9de5e6c09b1eeb'
    let jh = 'https://devapi.qweather.com/v7/weather/now?location=101250503&key='+key
    let ylq = 'https://devapi.qweather.com/v7/weather/now?location=101250109&key='+key
    let dg = 'https://devapi.qweather.com/v7/weather/now?location=101281601&key='+key
    wx.request({
      url: jh,
      success:(res)=>{
        let object1 = new Object()
        object1.city = '嘉禾县'
        object1.value = res.data
        tqs.push(object1)
      }
    })
    wx.request({
      url: ylq,
      success:(res)=>{
        let object1 = new Object()
        object1.city = '岳麓区'
        object1.value = res.data
        tqs.push(object1)
      }
    })
    wx.request({
      url: dg,
      success:(res)=>{
        let object1 = new Object()
        object1.city = '东莞市'
        object1.value = res.data
        tqs.push(object1)
      }
    })
    let task = setInterval(() => {
      // 两百毫秒执行一次，判断请求所有请求是否完成 如果完成 取消loading
      if(tqs.length == 3){
        t.setData({tianqi:tqs,opacity:1})
        clearInterval(task)
        wx.hideLoading()
      }
    }, 200);
    

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