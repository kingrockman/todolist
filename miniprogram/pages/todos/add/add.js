// pages/todos/add/add.js
import {
  DBPost
} from '../../../db/DBPost.js';
var config = {
  conn: 'todos',
  target: 'todos',
}
var todoPost = new DBPost(config.conn, '', config.target);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: {}
  },
  formSubmit(e) {
    var data = e.detail.value
    data.createDate=new Date();
    data.status='未处理';
    data.detail='';
    data.handler = '';
    data.creater='陈';

    todoPost.insert(data, this.myCB);
  },
  myCB() {
    wx.navigateBack({})
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    todoPost.page = this;
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