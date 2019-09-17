import {
  DBPost
} from '../../../db/DBPost.js';
var config = {
  conn: 'delivery',
  targer: 'list'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail) 
    var dbsave = new DBPost(config.conn, this, config.targer)
    var list = e.detail.value
    console.log(list._id == '')
    if (list._id == '') {
      delete list._id
      console.log(list)
      dbsave.insert(list);

    } else {
      dbsave.update(list);

    }
  },
  onTapToRemove(e) {
    console.log('form发生了reset事件，携带数据为：', e.currentTarget.dataset.removeId)
    var _id = e.currentTarget.dataset.removeId
    var dbpost = new DBPost(config.conn, this, config.targer);
    dbpost.remove(_id);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var index = options.id

    // console.log("editfromD"+index)
    if (typeof index != 'undefined') {
      var dbpost = new DBPost(config.conn, this, config.targer);
      var res = dbpost.getDataById(options.id);
      console.log(res)
      this.setData({
        list: res.data
      })
    }

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