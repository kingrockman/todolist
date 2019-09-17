var util = require('util/util.js')

import {
  DBPost
} from 'db/DBPost.js';

//app.js
App({
  onLaunch: function() {


    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      userInfo: {}
    };
    util.checkUserInfo(this);
    // init();
  },

});

function init() {
  var that = this;
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function(res) {
            console.log()
            
          }
        })
      }
    }
  })

  // wx.cloud.callFunction({
  //   name:'login',
  //   success:(res)=>{
  //     console.log(res.result)
  //     wx.getUserInfo({
  //       success: function (res) {
  //         var userInfo = res.userInfo
  //         var nickName = userInfo.nickName
  //         var avatarUrl = userInfo.avatarUrl
  //         var gender = userInfo.gender //性别 0：未知、1：男、2：女
  //         var province = userInfo.province
  //         var city = userInfo.city
  //         var country = userInfo.country
  //       }
  //     })
  //   }
  // })
};