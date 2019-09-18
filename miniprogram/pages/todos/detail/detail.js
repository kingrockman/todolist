// pages/todos/detail/detail.js
import {
  DBPost
} from '../../../db/DBPost.js';
var config = {
  conn: 'todos',
  target: 'todos',
}
var todoPost = new DBPost(config.conn, '', config.target);

function i() {

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: true,
    todos: {},
    isAccept: false
  },
  formSubmit(e) {
    // console.log(e.detail.value)
    // console.log(todoPost)
    todoPost.update(e.detail.value, this.myCB)

  },
  init(index) {
    todoPost.page = this;
    var data = wx.getStorageSync('todos');
    // console.log(data[index]);
    this.setData({
      todos: data[index]
    })
  },
  myCB(res) {
    // console.log('回调成功！', res[this.options.id])
    wx.showToast({
      title: '修改成功！',
    })
    this.toggle();
  },
  onAccept() {
    console.log(todoPost.app.globalData.nickName);
    var user = todoPost.app.globalData.nickName
    this.setData({
      isAccept: !this.data.isAccept,
      handler: this.data.isAccept ? '':user,
    })
  },
  toggle() {
    var flag = this.data.type;
    // if (!flag) this.init(this.options.id)
    // console.log(this.data.todos)
    this.setData({
      type: !flag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init(options.id)
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