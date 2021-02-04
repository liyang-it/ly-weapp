// pages/home/pages/page-v/vv7/index.js
var WxParse = require('../../../../../wxParse/wxParse.js');
import Dialog from '../../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    v: {},
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
    bfIndex: 0,
    descHeight: '72',
    isDesc: true
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
            url: 'https://www.liyangit.top/liyang/lyVideo/getVideoDetailed.json',
            data:{id: options.id},
            success:function(res){
              let vvs = []
              let indexOf1 = res.data.data.url.indexOf('$$$') // $$$代表一个源
              if(indexOf1 !== -1){
                // 说明有多个源
                let dx = ['一','二','三','四','五'] // 大写
                let indexOfCount = res.data.data.url.split('$$$').length // 有多少个源
                for(let i = 0;i<indexOfCount;i++){
                  let y = res.data.data.url.split('$$$')[i]
                  let urls = y.split('#')
                  for(let k = 0;k<urls.length;k++){
                    let plays = urls[k].split('$')
                    let object = new Object()
                    object.key = '线路'+dx[i]+':  ' + plays[0]
                    object.value = plays[1]
                    vvs.push(object)
                  }

                }
              }else{
                // 只有一个源
                let urls = res.data.data.url.split('#') // 剧集 分割
                for(let i = 0;i< urls.length;i++){
                  let plays = urls[i].split('$')
                  let object = new Object()
                  object.key = '线路一:' + plays[0]
                  object.value = plays[1]
                  vvs.push(object)
                }
              }
                t.setData({
                  src: vvs[0].value,
                  v: res.data.data,
                  vss: vvs,
                  d1: '当前剧集:',
                  d2: vvs[0].key,
                  jj: '暂无更多剧情介绍，当前影视可在 腾讯视频上播放。',
                  h1:'0',
                  h2:'asdasd',
                  h3: jsHeight,
                  bs: '1.0',
                  qhBs: '切换倍数'
              })
            }
          })
          wx.hideLoading()
        }else{
          wx.hideLoading()
        }
      }
    })
  },
  isDescF:function(){
    let t = this
    t.setData({isDesc: !t.data.isDesc})
    if(t.data.isDesc == true){
      t.setData({descHeight: ''})
    }else{
      t.setData({descHeight: '72'})
    }
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