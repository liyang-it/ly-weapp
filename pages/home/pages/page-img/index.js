// pages/home/pages/page-img/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.navObj.height,
    bgColor: app.bgColor,
    defaultImg: '../../../../static/cell/shibie2.png',
    baseImg:'',
    fileList: [],
    show: false,
    sbText:'物体与场景识别',
    sbAPi:'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
    sbResult:'',
    s: 'wt',
    actions: [
      {
        name:'物体与场景识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
        s: 'wt'
      },
      {
        name:'车型识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/car',
        s: 'cx'
      },
      {
        name: '动物识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal'
      },
      {
        name: '植物识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant'
      },
      {
        name: 'logo识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v2/logo'
      },
      {
        name:'果蔬识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient'
      },
      {
        name:'菜品识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish'
      },
      // {
      //   name:'红酒识别',
      //   api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine',
      //   s: 'hj'
      // },
      {
        name:'货币识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/currency',
        s: 'hb'
      },
      {
        name:'建筑物识别',
        api:'https://aip.baidubce.com/rest/2.0/image-classify/v1/landmark',
        s: 'jzw'
      },
    ],
  },
  showSb(){
    this.setData({show: true})
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    let t = this
    t.setData({sbText:event.detail.name,sbAPi:event.detail.api,s: event.detail.s})

  },
  parseBase64(t,url){
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        t.setData({defaultImg: url})
        let token = JSON.parse(wx.getStorageSync('bd_token'))
          wx.request({
            method:'POST',
            url: t.data.sbAPi, //仅为示例，并非真实的接口地址
            data: {
              access_token: token.token,
              image: encodeURI(res.data)
            },
            header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success (res2) {
              console.log(res2.data.result)
              let result = '识别结果： \n'
              if(t.data.s == 'hb'){
                // 识别  货币
                result += ' 名称： '+ res2.data.result.currencyName
                + ',缩写： '+res2.data.result.currencyCode
                + ',面额： '+res2.data.result.currencyDenomination
                + ',发行年份： '+res2.data.result.year
              }else if(t.data.s == 'jzw'){
                // 建筑物识别
                result += res2.data.result.landmark
              }else if(t.data.s == 'wt'){
                // 物体与场景识别
                for(let i = 0;i<res2.data.result.length;i++){
                  result += ' 物体名称：' +res2.data.result[i].keyword + '，类型：'+res2.data.result[i].root + '\n'
                }
              }else{
                for(let i = 0; i< res2.data.result.length;i++){
                  result += res2.data.result[i].name + '、'
                }
                result = result.substring(0,result.length - 1)
              }
              t.setData({sbResult: result})
              wx.hideLoading()
            }
            })
      }
    })
  },
  afterRead(event) {
    wx.showLoading({
      title: '识别中...',
    })
    let t = this
    const { file } = event.detail;
    t.parseBase64(t,file.url)
    
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