// pages/home/pages/page-v/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgHeight: 0,
    pl:{},
    plLineClamp: ''
  },
  copyContent(){
    let t = this
    wx.setClipboardData({
      data: t.data.pl.content,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '评论内容已复制'
            })
          }
        })
      }
    })
  },
  showGd(){
    this.setData({plLineClamp: ''})
  },
  loadPl(t){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.liyangit.top/liyang/getHotComments.json',
      success:(res)=>{
        t.setData({pl:res.data.data})
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    t.loadPl(t)

  },
  reloadPl(){
    this.loadPl(this)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let height = wx.getSystemInfoSync().windowHeight
    let h = 0
    let t = this 
      if(height > 856){
        h = 400
      }else{
        h = 300
      }
      t.setData({bgImgHeight: h})
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