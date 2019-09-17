class DBPost {

  /**
   * 构造函数
   * @param {集合名称} conn 集合名称
   * @param {微信页面} that 微信页面
   */
  constructor(conn, page, target) {
    this.wxcName = 'dbtools';
    this.conn = conn;
    this.page = page;
    this.storageKeyName = conn;
    this.target = target
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
    // var res = wx.getStorageSync(this.storageKeyName);
    // return res
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

  createData() {
    var data = {
      title: "韶关市凤翔农业有限公司新型环保节能砖场",
      beaign: "2019-08-27",
      tel: "13719724588",
      contract: "未签订,未回收",
      voucher: "普票",
      static: "未验收",
      no: '278154687',
      cdkey: "4545-5454-5454-5454",
      body: [
        "第一步",
        "第二步",
        "第三步",
      ],
    };
    return data;
  }

  /**
   * 增加一个记录
   */
  insert(data,myCB) {
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
        // console.log(myCB)
        myCB();
        // console.log("返回增加函数内容", res)
        // // that.query()
        // // data._id = res.result._id
        // // var local = that.getAllData()
        // // local.push(data)
        // that.execSetStorageSync(res.result.data)
        // wx.redirectTo({
        //   url: '../detail/detail?id=' + res.result.insert,
        // })
      },
      fail: console.error
    })
  };
  /**
   * 删除一条记录
   * @param {*} data 
   */
  remove(data,myCB) {
    // console.log("调用删除函数，传值", data)
    var that = this;
    wx.cloud.callFunction({
      name: this.wxcName,
      data: {
        type: 'remove',
        conn: this.conn,
        data: data
      },
      success: function(res) {
        // console.log("返回删除函数内容", res.result)
        // that.execSetStorageSync(res.result.data);
        // // that.execSetStorageSync(that.removeL(data));
        // wx.redirectTo({
        //   url: '../index',
        // })
      },
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
  update(data,myCB) {
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
        // that.execSetStorageSync(res.result.data);
        // that.query() 
        // console.log(data); 
        // wx.navigateTo({
        //   url: '../detail/detail?id=' + data._id,
        // })
        // wx.redirectTo({
        //   url: '../detail/detail?id=' + data._id,

        // })
      },

      fail: console.error

    })

  };
  /**
   * 查询所有记录
   */


  query(data, myCB) {
    this.loading()
    var that = this;
    // console.log("调用查询函数，传值", data)
    // console.log("query!")
    wx.cloud.callFunction({
      name: this.wxcName,
      data: {
        type: 'query',
        conn: this.conn,
        data: data
      },
      success: function (res) {
        // console.log(res);
        that.execSetStorageSync(res.result.data);
        myCB(res.result.data);
      },
      fail: console.error,

      // complete: wx.hideLoading()
    })
  };


}


export {
  DBPost
}