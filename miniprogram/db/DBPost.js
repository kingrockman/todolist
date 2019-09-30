var util = require('../util/util.js')

class DBPost {

  /**
   * 构造函数
   * @param {集合名称} conn 集合名称
   * @param {微信页面} that 微信页面
   */
  constructor(config) {
    this.wxcName = 'dbtools';
    this.conn = config.conn;
    this.page = config.page;
    this.storageKeyName = config.conn;
    this.target = config.conn;
    this.app = getApp();
  };

  loading() {
    wx.showLoading({
      title: '玩命加载中',
      mask: true,
    })
  }
  loaded() {}
  /*初始化缓存数据*/
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  };

  getDataById(index) {
    var data = this.getAllData();
    var len = data.length;
    for (var i = 0; i < len; i++) {
      if (data[i]._id == index) {
        // return {
        //   index: i,
        //   data: data[i]
        // }
        return {
          data: data[i],
          index: i
        }
      }
    }
  }
  getAllData() {
    return wx.getStorageSync(this.storageKeyName);
  }

  upLocalData(o) {
    var local = this.getAllData()
    // console.log(local);
    for (var i = 0; i < local.length; i++) {
      if (local[i]._id == o._id) {
        local.splice(i, 1, o)
      }
    }
    return local;
  }

  //加载数据
  flushData(data) {
    var o = {};
    o[this.target] = data;
    this.page.setData(o)
  };

  /**
   * 增加一个记录
   */
  insert(data, myCB) {
    this.loading();
    var that = this;
    // console.log("调用新增函数，传值", data)
    wx.cloud.callFunction({
      name: this.wxcName,
      data: {
        type: 'insert',
        conn: this.conn,
        data: data
      },
      success: function(res) {
        myCB();
      },
      fail: console.error
    })
  };
  /**
   * 删除一条记录
   * @param {*} data 
   */
  remove(data, myCB) {
    var that = this;
    wx.cloud.callFunction({
      name: this.wxcName,
      data: {
        type: 'remove',
        conn: this.conn,
        data: data
      },
      success: function(res) {},
      fail: console.error
    })
  };

  removeL(index) {
    var local = this.getAllData()
    for (var i = 0; i < local.length; i++) {
      if (local[i]._id == index) {
        local.splice(i, 1)
      }
    }
    return local
  }


  /**
   * 更新一条记录
   * @param {*} data 
   */
  update(data, myCB) {
    // console.log("调用修改函数，传值", data)
    var that = this;
    wx.cloud.callFunction({
      name: this.wxcName,
      data: {
        type: 'update',
        conn: this.conn,
        data: data
      },
      success: function(res) {
        // console.log("返回修改函数内容", res.result.data)
        myCB(res.result.data);
        that.execSetStorageSync(res.result.data);
      },

      fail: console.error

    })

  };


  /**
   * 查询所有记录
   */
  query(data, myCB) {
    var that = this;
    this.loading();
    wx.cloud.callFunction({
      name: this.wxcName,
      data: {
        type: 'query',
        conn: this.conn,
        data: data
      },
      success: function(res) {
        that.execSetStorageSync(res.result.data);
        myCB(res.result.data);
      },
      fail: console.error,
    })
  };


}


export {
  DBPost
}