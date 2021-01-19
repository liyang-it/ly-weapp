// pages/home/pages/page-v/vv7/index.js
var WxParse = require('../../../../../wxParse/wxParse.js');
import Dialog from '../../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vid: '',
    name: '',
    vss: [],
    d1: '不满足是向上的',
    d2:'齿轮',
    jj: '暂无更多剧情介绍，当前影视可在 腾讯视频上播放。',
    h1:'100',
    h2:'0',
    h3: '0',
    src: '',
    showBs: false,
    bs: '鲁迅',
    qhBs: '文书采集',
    bfIndex: 0
  },
  onChangeBs(event) {
    this.setData({
      bs: event.detail,
    });
    wx.createVideoContext('myVideo').playbackRate(Number(event.detail))
  },
  onClickBs(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      bs: name,
    });
    wx.createVideoContext('myVideo').playbackRate(Number(name))
  },
  onOpenBs(){
    this.setData({ showBs: true });
  },
  onCloseBs(){
    this.setData({ showBs: false });
  },
  bindendedF(){
    let t = this
    let index = t.data.bfIndex
    let length = t.data.vss.length - 1
    if(index == length){
      Dialog.alert({
        message: '恭喜你，又追完一部剧。',
        theme: 'round-button',
      }).then(() => {
        // on close
      });
    }else{
      wx.showLoading({
        title: '请稍等...',
      })
      let index = t.data.bfIndex + 1
      t.setData({d2:t.data.vss[index].key,src: t.data.vss[index].value,bfIndex: index})
      wx.createVideoContext('myVideo').pause()
      setTimeout(()=>{
        wx.hideLoading()
      },2000)
    }
  },
  bf(e){
    let index = e.currentTarget.dataset.index
    this.setData({d2:this.data.vss[index].key,src: this.data.vss[index].value,bfIndex: index})
    wx.showLoading({
      title: '请稍等...',
    })
    wx.createVideoContext('myVideo').pause()
    // 重新渲染
    // var article = '<video id="myVideo" src="'+array[index].value+'"controls="controls" autoplay></video>';
    // WxParse.wxParse('v', 'html', article, this, 5);
    setTimeout(()=>{
      wx.hideLoading()
    },2000)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    let jsHeight = wx.getSystemInfoSync().windowHeight - 400
    wx.showLoading({
      title: '请稍等...',
    })
    wx.request({
      url: 'https://www.liyangit.top/liyang/video/getShow.json',
      success:(r)=>{
        let show = r.data.data
        if(show != 0){
          wx.request({
            url: 'https://api.eyunzhu.com/api/vatfs/resource_site_collect/getVDetail?vid='+ options.vid,
            success:(res)=>{
              let keys = Object.keys(res.data.data.playUrl)
              let values = Object.values(res.data.data.playUrl)
              let vss = []
              for(let i = 0;i< keys.length;i++){
                let object = {}
                object.key = keys[i]
                object.value = values[i]
                vss.push(object)
              }
              t.setData({src: values[0]})
              var article = '<video id="myVideo" src="'+values[0]+'"controls="controls" autoplay></video>';
              WxParse.wxParse('v', 'html', article, this, 5);
              setTimeout(() => {
                t.setData({
                  vid: options.vid,
                  name: options.name,
                  vss: vss,
                  d1: '当前剧集:',
                  d2: keys[0],
                  jj: '暂无更多剧情介绍，当前影视可在 腾讯视频上播放。',
                  h1:'0',
                  h2:'asdasd',
                  h3: jsHeight,
                  bs: '1.0',
                  qhBs: '切换倍数'
              })
              wx.hideLoading()
              }, 2000);
            }
          })
        }else{
          wx.hideLoading()
        }
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