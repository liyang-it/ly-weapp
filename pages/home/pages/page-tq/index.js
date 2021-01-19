// pages/home/pages/page-tq/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    bgColor: app.bgColor,
    dhlHeight: app.navObj.height,
    showDhl: 'none',
    cs:{},
    bgImgs: [
      'http://file.liyangit.top/weapp/tqbg-b.png',
      'http://file.liyangit.top/weapp/tqbg-y.png'
    ],
    bgIms: 'http://file.liyangit.top/weapp/tqbg-b.png',
    showPopup: false,
    sktq:{}, // 实况天气
    jy:{},  // 降雨信息
    h24:{}, // 24小时天气预报
    qt:{}, // 七天天气预报
    isShJyXx: false,
    shJyText: '展开详细',
    shDispJy: 'none',
    opacityJy: 0,
    citys:[]
  },
  // 刷新
  reloadTq(){
    this.initTianQi(this,this.data.cs.lon,this.data.cs.lat)
  },
  showJyXx(){
    // 是否显示降雨详细内容
    let t = this
    if(t.data.isShJyXx == false){
      // 展开
      // 先去除 隐藏 再去除透明
      t.setData({shJyText: '收起详细',shDispJy: '',isShJyXx: true})
      setTimeout(() => {
        t.setData({opacityJy: 1})
      }, 300);
    }else{
      // 收起
      // 先加入透明元素 在隐藏
      t.setData({shJyText: '展开详细',opacityJy: 0,isShJyXx: false})
      setTimeout(() => {
        t.setData({shDispJy: 'none',})
      }, 300);
    }
  },
  onClose() {
    this.setData({ showPopup: false });
  },
  showPopup(){
    this.setData({ showPopup: true });
  },
  /**
   * t = this
   * lon = 经度
   * lat = 维度
   */
  initTianQi:(t,lon,lat)=>{
    wx.showLoading({
      title: '加载中...',
    })
    let rCount = 4
   // 实况天气请求
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now?location='+lon+','+lat+'&key=c5e46449a8d349c09e9de5e6c09b1eeb&gzip=y',
        success:(res)=>{
          t.setData({sktq: res.data.now})
          rCount = rCount - 1
          
        }
      })
      // 分钟级降水请求
      wx.request({
        url: 'https://devapi.qweather.com/v7/minutely/5m?location='+lon+','+lat+'&key=c5e46449a8d349c09e9de5e6c09b1eeb',
        success:(res)=>{
          t.setData({jy: res.data})
          rCount = rCount - 1
        }
      })
      // 未来 24小时天气预报
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/24h?location='+lon+','+lat+'&key=c5e46449a8d349c09e9de5e6c09b1eeb',
        success:(res)=>{
          t.setData({h24: res.data.hourly})
          rCount = rCount - 1
        }
      })
      // 七天天气预报
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/7d?location='+lon+','+lat+'&key=c5e46449a8d349c09e9de5e6c09b1eeb',
        success:(res)=>{
          t.setData({qt: res.data.daily})
          rCount = rCount - 1
        }
      })
      let task = setInterval(()=>{
        if(rCount == 0){
          clearInterval(task)
          wx.hideLoading()
        }
      },100)
  },
  loadQTQ:function(e){
    this.initTianQi(this,e.currentTarget.dataset.text.lon,e.currentTarget.dataset.text.lat)
    this.setData({showPopup: false,value: '',citys: [],cs: e.currentTarget.dataset.text})

  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    if(this.data.value.length != 0){
      this.queryCity(this,this.data.value)
    }else{
      this.setData({citys: []})
    }
    
  },
  onSearch() {
    this.queryCity(this,this.data.value)
  },
  onClick() {
    this.queryCity(this,this.data.value)
  },
  queryCity(t,str){
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?location='+str+'&key=c5e46449a8d349c09e9de5e6c09b1eeb',
      success:(res)=>{
        t.setData({citys: res.data.location})
      
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断当前日期 是白天还是夜晚
    let t = this
    t.setData({cs: app.cs})
    let date = new Date()
    let hours = date.getHours()
    if(hours >=7 && hours<=18){
      t.setData({bgIms: t.data.bgImgs[0]})
    }else{
      t.setData({bgIms: t.data.bgImgs[1]})
    }
    t.initTianQi(t,t.data.cs.lon,t.data.cs.lat)
    
 

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
  // 监听导航栏滚动
  onPageScroll:function(e){
    let t = this
    if(e.scrollTop >1 ){
      t.setData({showDhl: 'block'})
    }else{
      t.setData({showDhl: 'none'})
    }
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