Page({
  data: {
    // 全部商品
    goods: [],
    // 地址信息
    address: {},
    // 全部数量
    allNum: 0,
    // 总价
    allPrice: 0
  },
  onShow: function () {
    const data = wx.getStorageSync("cart");
    let { goods } = this.data
    data.forEach(v => {
      if (v.check) {
        goods.push(v)
      }
    })
    const address = wx.getStorageSync("address")
    let { allNum, allPrice } = this.data
    goods.forEach(v => {
      allNum += v.num
      allPrice += v.num * v.goods_price
    })
    this.setData({
      goods,
      address,
      allNum,
      allPrice
    })
  },
  // 支付
  pay() {
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
          // 将已经付款的商品删除
          let cart = wx.getStorageSync("cart");
          // filter => 返回条件符合的元素
          cart = cart.filter(v => !v.check)
          wx.setStorageSync("cart", cart);
          // 将已付款的商品添加到缓存用于订单
          // 给已付款商品加上付款时间
          let date = new Date()
          let time = date.toLocaleString()
          let {goods} = this.data
          goods.forEach(v=>v.time = time)
          let buygoods = wx.getStorageSync("buygoods");
          wx.setStorageSync("buygoods", [...buygoods, ...goods]);
        }
      },
    });
  }
})