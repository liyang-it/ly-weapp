// app.js
App({
  onLaunch() {
    // 获取右上角胶囊定位信息
    let nav = wx.getMenuButtonBoundingClientRect()
    this.navObj.top = nav.top
    this.navObj.height = (nav.height + nav.top) + 10
    // 获取百度智能云api接口所需的token
    let bd_token = wx.getStorageSync('bd_token')
    if(bd_token == null || bd_token == '' || bd_token == undefined){ 
      console.info('重新获取token')
      let bdToken = new Object()
      wx.request({
        url: 'https://aip.baidubce.com/oauth/2.0/token', //仅为示例，并非真实的接口地址
        method:'GET',
        enableCache:'true',
        data: {
          grant_type: 'client_credentials',   //
          client_id: 'OcL5qUQ2n7KB9Gg8v4jM8dvf',    //
          client_secret: 'snSgx4M4Dgc7XCb1FTDrzyxaYb3WHdLH' //
        },
        header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          bdToken.token = res.data.access_token
          bdToken.expires_in = res.data.expires_in
          wx.setStorageSync('bd_token', JSON.stringify(bdToken))
        }
        })
    }else{
      console.info('token已存在')
    }

 
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  navObj:{
    top: 0,
    hieght: 0
  },
  bgColor: '#271B58',
  cs:{

  },
  defaultCity: '东莞'
})
