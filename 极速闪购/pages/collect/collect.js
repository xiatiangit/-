Page({
  data: {
    val: [
      {
        id: 0,
        value: "商品收藏",
        active: true
      },
      {
        id: 1,
        value: "关注商品",
        active: false
      },
      {
        id: 2,
        value: "店铺收藏",
        active: false
      },
      {
        id: 3,
        value: "浏览足迹",
        active: false
      },
    ],
    collect:[]
  },
  onShow:function(){
    let curPages = getCurrentPages();
    let page = curPages[curPages.length - 1]
    let {val} = page.options
    this.changeActive(parseInt(val))
    // 获取收藏商品数据
    let collect = wx.getStorageSync("collect");
    this.setData({
      collect
    })
  },
  tabsItemChange(e) {
    // 获取点击的索引
    const { index } = e.detail
    this.changeActive(index)
  },
  changeActive(index) {
    let { val } = this.data
    val.forEach((v, i) => i === index ? v.active = true : v.active = false)
    this.setData({
      val
    })
  },
  // 跳转到商品详情页面
  jump(e){
    let {index} = e.currentTarget.dataset
    let goodsId = this.data.collect[index].goods_id
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goods_id='+goodsId,
    });
      
  }
})