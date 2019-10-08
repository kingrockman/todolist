// pages/todos/add/add.js
var util = require('../../../util/util.js')

import {
  DBPost
} from '../../../db/DBPost.js';
var config = {
  conn: 'todos',
  target: 'todos',
}
var addPost = new DBPost(config);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: {}
  },
  formSubmit(e) {
    var data = e.detail.value
    var userInfo = util.getStorageData('userInfo').userInfo.nickName;
    var createDate = new Date();
    createDate = createDate.getTime();
    data.createDate = createDate
    data.status = false;
    data.detail = '';
    data.handler = '';
    data.creater = userInfo;
    console.log(data);


    addPost.insert(data, this.myCB);
  },
  myCB() {
    wx.navigateBack({})
    wx.hideLoading();
  },
  init() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    addPost.page = this;
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