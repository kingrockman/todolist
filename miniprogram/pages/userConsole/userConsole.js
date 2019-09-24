// pages/userConsole/userConsole.js
var util = require('../../util/util.js')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: '受权登陆',
    userIcon: '../../image/login.png',
    authorized: false
  },
  f() {

  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    var userInfo = e.detail
    // app.globalData.userInfo=userInfo
    util.setStorageData('userInfo',userInfo)
    this.setData({
      userName: userInfo.nickName,
      userIcon: userInfo.avatarUrl,
      authorized: true
    })
  },
  init(){
    var userInfo = util.getStorageData('userInfo');
    if(userInfo){
      this.setData({
        userName: userInfo.userInfo.nickName,
        userIcon: userInfo.userInfo.avatarUrl,
        authorized: true

      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})