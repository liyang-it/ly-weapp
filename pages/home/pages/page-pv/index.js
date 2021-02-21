// pages/home/pages/page-pv/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.navObj.height,
    value: '',
    defaultTitle: '粘贴内容',
    cHeight: '80vh',
    src: '',
    jxHeight: '0',
    cBottom: '0'
  },
  jx: function(){
    let t = this
    let value = t.data.value
    if(value.length == 0){
      wx.showToast({
        title: '无效地址！',
        icon:'error'
      })
      return
    }
    wx.showLoading({
      title: '解析中...',
    })
    let regex = /http[s]?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&:\-\+\%]*[/]*/ // url规则
    try {
      let v =  value.match(regex)[0];
          
    wx.request({
      url: 'https://tenapi.cn/video/?url='+v,
      success: function(res){
        if(res.data.code == 200){
          let url = res.data.url
          url = url.substring(url.indexOf(':'))
          url = 'https'+ url
          t.setData({src: url,cHeight: '100%',jxHeight: 'asdasdasd',cBottom: '50'})
        }else if(res.data.code == 202){

        }
        wx.hideLoading()
      },
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: '链接错误',
        })
      }
    })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '链接错误',
        icon:'error'
      })
    }

  },
  getTextAreaValue: function(e){
    let t = this
    if(e.detail.value.length > 0){
      t.setData({defaultTitle: '清空内容'})
    }
    t.setData({value : e.detail.value})
  },
  parse_clear: function(){
    let t = this
    
    if(t.data.value.length == 0){
      // 没有内容搞的时候点击为粘贴
      t.setData({defaultTitle: '清空内容'})
      wx.getClipboardData({
        success: function(res){
          t.setData({value: res.data})
        }
      })
      
    }else{
      // 有内容的时候点击为清空
      t.setData({defaultTitle: '粘贴内容'})
      t.setData({value: '',cHeight: '80vh',jxHeight: '0',cBottom: '0'})
    }
    
  },
  saveVideo: function(){
    let t = this 
    wx.showLoading({
      title: '保存中...',
    })
    wx.request({
      url: 'https://www.liyangit.top/liyang/video/saveVideo.json',
      method: 'POST',
      data:{'url' : t.data.src},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
      success: function(r){
        if(r.data.code == 505){
          wx.hideLoading()
          wx.showModal({
            title: '警告',
            content: '微信不允许保存超过50MB大小的文件，如需要保存 请复制无水印视频链接至浏览器进行保存',
            success (res) {
              if (res.confirm) {
              } else if (res.cancel) {
              }
            }
          })
        }else{
          wx.downloadFile({
            url: r.data.msg, //仅为示例，并非真实的资源
            success (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                wx.saveVideoToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success:function(res2){
                    wx.hideLoading()
                    wx.showToast({
                      title: '保存成功',
                    })
                  }
                })
              }else{
                wx.hideLoading()
                wx.showToast({
                  title: '保存失败',
                })
              }
            }
          })
        }

      }
    })
  },
  copyVideo: function(){
    let t = this
    t.getCopyUrl(t)
  },
  getCopyUrl: function(t){
    wx.setClipboardData({
      data: t.data.src,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
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