Page({
  data: {

  },
  getUser(e){
    let user = e.detail.userInfo
    wx.setStorageSync("user", user);
    wx.navigateBack({
      delta: 1
    });
  }
})