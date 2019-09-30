// pages/todos/detail/detail.js
var util = require('../../../util/util.js')
import {
  DBPost
} from '../../../db/DBPost.js';
var config = {
  conn: 'todos',
  target: 'todos',
}
var todoPost = new DBPost(config);

function i() {

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: true,
    isAccept: false,
    contents: '',
    createDate: '',
    creater: '',
    customer: '',
    detail: '',
    handler: '',
    status: '',
    _id: '',
    array: util.getStorageData('users'),
  },
  formSubmit(e) {
    var data = e.detail.value
    data.createDate = Date(data.createDate);
    todoPost.update(data, this.myCB)
    // console.log(data);
  },
  init(index) {
    todoPost.page = this;
    var data = wx.getStorageSync('todos');
    this.setData({
      contents: data[index].contents,
      createDate: util.formatDate( data[index].createDate),
      creater: data[index].creater,
      customer: data[index].customer,
      detail: data[index].detail,
      handler: data[index].handler,
      status: data[index].status,
      _id: data[index]._id
    })
  },
  myCB(res) {
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
      handler: this.data.isAccept ? '' : user,
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
  statusChange(e) {
    this.setData({
      status: e.detail.value
    })
  },
  handlerChange(e) {
    console.log(todoPost.app.globalData.nickName);
    this.setData({
      handler: !this.data.handler ? todoPost.app.globalData.nickName : ''
    })
  },
  bindPickerChange(e){
    this.setData({
      handler: this.data.array[e.detail.value]
    })
    console.log(this.data.array[e.detail.value])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init(options.id)
    var users=util.getStorageData('users')
    var arr=['未派工']
    for(var i =0;i<users.length;i++){
      arr.push(users[i].userName)
    }
    this.setData({
      array:arr,
      index:0,
    })

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