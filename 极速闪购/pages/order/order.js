Page({
  data: {
    tab: [
      {
        id: 0,
        value: "全部",
        active: true
      },
      {
        id: 1,
        value: "待付款",
        active: false
      },
      {
        id: 2,
        value: "待发货",
        active: false
      },
      {
        id: 3,
        value: "退款/退货",
        active: false
      }
    ],
    // 订单数据
    order: [],
  },
  onShow: function () {
    let page =  getCurrentPages();
    let {type} = page[page.length-1].options
    this.changeActive(parseInt(type))
    // 获取缓存中订单数据
    const order = wx.getStorageSync("buygoods");
    this.setData({
      order
    })
  },
  tabsItemChange(e) {
    // 获取点击的索引
    const { index } = e.detail
    this.changeActive(index)
  },
  changeActive(index) {
    let { tab } = this.data
    tab.forEach((v, i) => i === index ? v.active = true : v.active = false)
    this.setData({
      tab
    })
  }
})