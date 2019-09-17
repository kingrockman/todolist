import {
  DBPost
} from '../../db/DBPost.js';
var config = {
  conn: 'delivery',
  target: 'list',
}
var dbpost = new DBPost(config.conn, this, config.target);


Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  onTapToEdit(event) {
    wx.redirectTo({
      url: 'edit/edit',
    })
  },
  initPage(){
    // var dbpost = new DBPost(config.conn, this, config.target);
    dbpost.query("","2");
    dbpost.page = this;
    // var res = dbpost.getAllData();
    // dbpost.flushData(res);

  },
  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    console.log("index.j" + postId);
    wx.redirectTo({
      url: 'detail/detail?id=' + postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    this.initPage();
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // dbpost.query();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // dbpost.query();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // dbpost.query();

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // dbpost.query();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // console.log(dbpost)
    this.initPage();
    // dbpost.flushData();
    wx.stopPullDownRefresh();
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