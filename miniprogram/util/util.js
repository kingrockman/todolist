// let app =getApp();
function checkUserInfo(app) {
  // console.log(app.globalData);
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function(res) {
            // console.log(res)
            app.globalData=res.userInfo
            // console.log(app)

          }
        })
      }
    }
  })
}
module.exports = {
  checkUserInfo: checkUserInfo
}