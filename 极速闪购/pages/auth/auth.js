Page({
  data: {
    ljPay: [],
    address: {}
  },
  onShow: function () {
    // 获取缓存立即购买商品
    let ljPay = wx.getStorageSync("ljPay");
    // 获取缓存地址
    let address = wx.getStorageSync("address");
    this.setData({
      address,
      ljPay
    })
    this.data.ljPay[0].num = 1
  },
  // 获取收货地址
  getAddress() {
    wx.chooseAddress({
      success: (result) => {
        this.setData({
          address: result
        })
        wx.setStorageSync("address", result);
      },
    });
  },
  // 支付
  pay() {
    let { address } = this.data
    if (address === "") {
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none',
      });
    } else {
      wx.showModal({
        title: '支付',
        content: '是否购买商品？',
        success: (result) => {
          // 确认支付
          if (result.confirm) {
            // 支付后返回购物车页面
            wx.navigateBack({
              delta: 1
            });
            // 将已付款的商品添加到缓存用于订单
            // 给已付款商品加上付款时间
            let date = new Date()
            let time = date.toLocaleString()
            let { ljPay } = this.data
            ljPay.forEach(v => v.time = time)
            let buygoods = wx.getStorageSync("buygoods");
            wx.setStorageSync("buygoods", [...buygoods, ...ljPay]);
          }
        },
      });
    }
  }
})