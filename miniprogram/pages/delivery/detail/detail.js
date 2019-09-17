import {
  DBPost
} from '../../../db/DBPost.js';
var config = {
  conn: 'delivery',
  targer: 'list'
}
var detail = new DBPost(config.conn, this, config.targer);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    input: {}
  },
  flushPageData(data) {


  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var local = detail.getAllData();
    var oldindex = detail.getDataById(this.options.id).index
    var newData = {
      content: e.detail.value.content,
      creater: '李四',
      date: new Date().toString()
    }

    local[oldindex].body[e.detail.value.index] = newData
    detail.execSetStorageSync(local)
    this.setData({
      detail: local[oldindex],
      input: ''
    })
    console.log(local)
    // var lo = detail.getDataById(this.options.id)
    // var res = e.detail.value
    // if (res.content) {
    //   res.creater = "张三";
    //   res.date = new Date().toString();
    //   res1.body.push(res)
    //   detail.execSetStorageSync(res1);
    //   this.setData({
    //     detail: res1,
    //     input: ""
    //   })

    //   console.log(res1);
    // } else {
    //   console.log("请输入内容");

    // }
  },
  navToList() {
    wx.switchTab({
      url: '../index'
    })
  },
  navToEdit(event) {
    var postId = event.currentTarget.dataset.postId;
    console.log("detailtoE" + postId);
    wx.redirectTo({
      url: '../edit/edit?id=' + postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = detail.getDataById(options.id);
    this.setData({
      detail: data.data,
      input: ""
    })



    // // this.setData({ list: dbpost.createData() });
    // dbpost.insert();
    // dbpost.flushData('list');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.flushPageData(this.options.id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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