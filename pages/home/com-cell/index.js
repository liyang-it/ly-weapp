// pages/home/com-cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPage(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.page
      })
    },
    openMusicWeapp(){
      wx.navigateToMiniProgram({
        appId: 'wxc52ed9c139f62313',
        extraData: {
        from: 'liyang'
        },
        envVersion: 'release',
        success(res) {
        }
        })
    },
    notPage(){
      wx.showToast({
        title: '正在开发中...',
        icon: 'error',
        duration: 500
      })
    }
  }
})
