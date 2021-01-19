// pages/me/liyang/coms-cmd/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tianqi:{
      type: Array
    },
    opacity: {
      type: Number
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    key: 'c5e46449a8d349c09e9de5e6c09b1eeb',// 和风天气 应用的key
    city: ['嘉禾','岳麓区','东莞'], // 查询城市数组
    cityId:['101250503','101250109','101281601'],// 城市id 通过 https://geoapi.qweather.com/v2/city/lookup?location=嘉禾&key=c5e46449a8d349c09e9de5e6c09b1eeb;获取
    tianqi:[],
    isLoadCity: false,
    title: 'centos7@liyang:/',
    label: '[centos7@liyang /]$ '
    

  },

  /**
   * 组件的方法列表
   */
  methods: {
    copyLink(e){
      console.info(e)
      wx.showModal({
        title: '提示',
        content: '因小程序不能直接打开网页，请把链接输入到浏览器访问',
        confirmText:'复制链接',
        success (res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.currentTarget.dataset.link,
              success (res) {
                
                wx.showToast({
                  title: '链接复制成功',
                  icon: 'success'
                })
                wx.vibrateLong()
              }
            })
          } 
        }
      })
    },
    openWeapp(){
      wx.navigateToMiniProgram({
        appId: 'wxc52ed9c139f62313',
        extraData: {
        from: 'liyang'
        },
        envVersion: 'release',
        success(res) {
        }
        })
    }

  }
})
