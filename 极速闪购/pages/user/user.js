Page({
  data: {
    user:{},
    collectNum:0
  },
  onShow(){
    // 获取用户信息
    const user = wx.getStorageSync("user");
    // 获取收藏商品的数据
    const collectNum = wx.getStorageSync("collect");
    this.setData({
      user,
      collectNum
    })
  }
})