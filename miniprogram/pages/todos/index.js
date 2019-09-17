import {
  DBPost
} from '../../db/DBPost.js';
var config = {
  conn: 'todos',
  target: 'todos'
}
var todosPost = new DBPost(config.conn, '', config.target);
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: []
    // todosArr: [{
    //   title: "晨希",
    //   contents: '添加共享打印机',
    //   status: "处理中",
    //   handler: "陈浩",
    //   createDate: '2016-09-15',
    //   detail: '',
    //   creater: '黄洁'

    // }, {
    //   title: "晨希2",
    //   contents: '添加共享打印机2',
    //   status: "处理中2",
    //   handler: "陈浩2",
    //   createDate: '2016-09-15',
    //   detail: '',
    //   creater: '黄洁'
    // }]
  },
  init() {
    todosPost.page = this;
    // console.log(todosPost);
    todosPost.query('', this.myCB);
  },
  myCB(res) {
    // console.log(res)
    this.setData({
      todos: res
    })
    wx.hideLoading();
  },
  checkUserInfo() {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);

    } else {
      console.log("请进行用户受权！");

    }
  },
  onTapToAdd() {
    // wx.navigateTo({
    //   url: 'add/add',
    // })
    this.checkUserInfo();
  },
  onTapToRemove(e) {
    var that = this;
    console.log(e.currentTarget.dataset.wxId)
    var _id = e.currentTarget.dataset.wxId
    wx.showModal({
      title: '提示',
      content: '是否删除当前记录',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          todosPost.remove(_id, '')
          todosPost.query('', that.myCB);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onTapToDetail(e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: 'detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.init();

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
    this.init();
    wx.stopPullDownRefresh()
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