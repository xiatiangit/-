import { request } from '../../request/index.js'
Page({
  data: {
    // 商品详情数据
    goods: [],
    // 商品图片大图
    goodsInfo: {},
    // 商品是否被收藏
    isCollect: false
  },
  onShow: function () {
    let curPages = getCurrentPages();
    let page = curPages[curPages.length - 1]
    let options = page.options
    const { goods_id } = options
    this.getGoods(goods_id)
  },
  // 获取商品详情数据
  getGoods(goods_id) {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data: { goods_id } })
      .then(result => {
        let data = result.data.message
        this.data.goodsInfo = data
        // 获取缓存中商品收藏的数据
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = collect.some(v => v.goods_id === this.data.goodsInfo.goods_id)
        this.setData({
          goods: {
            goods_id: data.goods_id,
            goods_name: data.goods_name,
            goods_price: data.goods_price,
            goods_introduce: data.goods_introduce,
            pics: data.pics,
          },
          isCollect
        })
      })
  },
  // 轮播图点击查看大图
  active(e) {
    // previewImage   在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
    const urls = this.data.goodsInfo.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: urls[e.currentTarget.dataset.index],
      urls: urls,
    });
  },
  // 加入购物车
  addCart() {
    let cart = wx.getStorageSync("cart") || [];
    // findIndex 从数组中筛选对应的数值并返回它的索引值,如果没有则返回-1
    let index = cart.findIndex(v => v.goods_id === this.data.goodsInfo.goods_id)
    if (index === -1) {
      // 此商品不存在，是第一次添加
      // 将此商品的数量初始值设置为1
      this.data.goodsInfo.num = 1
      this.data.goodsInfo.check = true
      cart.push(this.data.goodsInfo)
    } else {
      // 此商品存在，数量++
      cart[index].num++
    }
    // 将设置好的购物车数据重新添加到缓存中
    wx.setStorageSync("cart", cart);
    // 弹框提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      // mask 防止用户一直点击
      mask: true,
    });
  },
  // 收藏
  collect() {
    let isCollect = false
    let { goodsInfo } = this.data
    // 获取缓存中商品收藏的数据
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === goodsInfo.goods_id)
    // 判断该商品是否被收藏过
    if (index != -1) {
      // 该商品已被收藏,将已收藏的商品删除
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask:true
      });
    } else {
      // 该商品未被收藏，将该商品加入收藏
      collect.push(goodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask:true
      });
    }
    console.log(collect);
    // 将数据重新加入缓存中
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  },
  // 立即购买
  ljPay(){
    wx.setStorageSync("ljPay", [this.data.goodsInfo]);
  }
})