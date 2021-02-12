import { request } from '../../request/index.js'
Page({
  data: {
    // 左侧菜单数据数组
    menuList: [],
    // 右侧分类数据数组
    catesList: [],
    // 分类数据
    cates: [],
    activeIndex: 0,
    scrtop:0
  },
  onLoad: function (options) {
    // 获取本地存储的数据(利用缓存提高性能)
    const cates = wx.getStorageSync("cates");
    // 判断本地存储是否有数据
    if (!cates) {
      // 如果没有则发送请求获取数据
      this.getMenuList()
    } else {
      // 如果有数据,判断数据是否过期
      if (Date.now() - cates.time > 1000 * 10) {
        // 如果数据已经过期则重新请求数据
        this.getMenuList()
      } else {
        // 如果数据没有过期则使用本地存储的数据进行页面渲染
        this.cates = cates.data
        let left = this.cates.map(v => v.cat_name)
        let right = this.cates[this.data.activeIndex].children
        this.setData({
          menuList: left,
          catesList: right
        })
      }
    }

  },
  // 左侧菜单点击切换事件
  active(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      activeIndex: index,
      // 点击之后将详细分类移动到顶端
      scrtop:0
    })
    // 点击之后重新获取右侧分类数据后刷新
    this.getMenuList()
  },
  // 获取分类函数
  getMenuList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/categories" })
      .then(result => {
        this.cates = result.data.message
        // 将接口数据先存入本地存储用于缓存
        wx.setStorageSync("cates", { time: Date.now(), data: this.cates });
        let left = this.cates.map(v => v.cat_name)
        let right = this.cates[this.data.activeIndex].children
        this.setData({
          menuList: left,
          catesList: right,
        })
      })
  }
})