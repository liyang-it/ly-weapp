// pages/home/pages/page-v/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dhlHeight: app.navObj.height,
    showDhl: 'none',
    bgImgHeight: 0,
    searchWidth: 0,
    search: '',
    iconClear: 'none',
    vs:[],
    resultHeight: 0,
    page: 1,
    limit: 20,
    displayApdBtn: false
  },
  // moreVs(){
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   let t= this
  //   t.setData({page: t.data.page + 1})
  //   wx.request({
  //     url: 'https://api.eyunzhu.com/api/vatfs/resource_site_collect/search?kw='+t.data.search+'&per_page=50&page='+t.data.page,
  //     success:(res)=>{
  //       let dataLength = res.data.data.data.length
  //       if(dataLength == 0){
  //         wx.hideLoading()
  //         wx.showToast({
  //           title: '已加载全部',
  //           icon: 'error'
  //         })
  //       }else{
  //         t.setData({vs:t.data.vs.concat(res.data.data.data)})
  //       }
  //       wx.hideLoading()
  //     }
  //   })
  // },
  // openV(item){
  //   let p = item.currentTarget.dataset.item
  //   let url = '/pages/home/pages/page-v/vv7/index?vid='+  p.vid + '&name=' + p.name
  //   wx.navigateTo({
  //     url: url
  //   })

  // },
  // clearSearch(){
  //   this.setData({search: '',iconClear: 'none',vs:[]})
  // },
  // inputSearch(e){
  //   this.setData({search: e.detail.value})
  //   if(e.detail.value.length > 0){
  //     this.setData({iconClear: ''})
  //     this.getSp(this,e.detail.value)
  //   }else{
  //     this.setData({iconClear: 'none',vs: []})
  //   }
    
    
  // },
  // okSearch(){
  //   let value = this.data.search
  //   let t = this
  //   if(value.length > 0){
  //     t.getSp(t,value)
  //   }
  // },
  // getSp(t,value){
  //   wx.showLoading({
  //     title: '请稍等...',
  //   })
  //   wx.request({
  //     url: 'https://api.eyunzhu.com/api/vatfs/resource_site_collect/search?kw='+value+'&per_page=50&page=1',
  //     success:(res)=>{
  //       t.setData({vs:res.data.data.data})
  //       wx.hideLoading()
  //     }
  //   })
  // },
  // 新方法
  query_btn:function(){
    wx.showLoading({
      title: '搜索中...',
    })
    let t = this
    t.setData({page: 1})
    wx.request({
      url: 'https://www.liyangit.top/liyang/lyVideo/getVideoList.json',
      data:{
        name: t.data.search,
        page: t.data.page - 1,
        limit: t.data.limit
      },
      success:(res)=>{
        t.setData({vs:res.data.data})
        wx.hideLoading()
      }
    })
  },
  append_btn:function(){
    wx.showLoading({
      title: '搜索中...',
    })
    let t = this
    if(t.data.displayApdBtn === true){
      wx.hideLoading()
      wx.showToast({
        title: '没有更多了',
        icon: 'error'
      })
      return
    }
    let page = t.data.page + 1
    t.setData({page: page})
    wx.request({
      url: 'https://www.liyangit.top/liyang/lyVideo/getVideoList.json',
      data:{
        name: t.data.search,
        page: (page - 1) * t.data.limit,
        limit: t.data.limit
      },
      success:(res)=>{
        
        if(res.data.data.length === 0){
          t.setData({vs:t.data.vs.concat(res.data.data),displayApdBtn: true})
        }else{
          t.setData({vs:t.data.vs.concat(res.data.data)})
        }
        wx.hideLoading()
      }
    })
  },
  openV:(e)=>{
    console.info(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/home/pages/page-v/vv8/index?id='+  e.currentTarget.dataset.id,
    })
  },
  // 监听input 输入
  inputSearch:function(e){
    this.setData({search: e.detail.value})
  },
  // 回到顶部
  goTop(){
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
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
    let height = wx.getSystemInfoSync().windowHeight
    let width = wx.getSystemInfoSync().windowWidth
    
    let h = 250
    let w = 180
    let t = this 
    if(width > 320){
      w = 230
    }
    // if(height > 856){
    //     h = 400
    //   }else{
    //     h = 300
    //   }
      t.setData({bgImgHeight: h,searchWidth: w,resultHeight: (height - h) - 40})
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