import { request } from '../../request/index.js'
Page({
  data: {
    // 标签栏
    tabs: [
      {
        id: 0,
        value: "综合",
        active: true
      },
      {
        id: 1,
        value: "销量",
        active: false
      },
      {
        id: 2,
        value: "价格",
        active: false
      },
    ],
    // 接口需要的参数
    params: {
      query: '',
      cid: '',
      pagenum: 1,
      pagesize: 10
    },
    // 商品数据
    goodsList: [],
    // 总页数
    total: 1
  },
  // 子组件传来的数据进行的点击事件
  tabsItemChange(e) {
    // 获取点击的索引
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.active = true : v.active = false)
    this.setData({
      tabs
    })
  },
  onLoad: function (options) {
    // 将点击商品的id赋值个接口参数
    this.data.params.cid = options.cid
    // 发送数据请求
    this.getGoodsList()
  },
  // 获取商品列表数据
  getGoodsList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search", data: this.data.params })
      .then(result => {
        // 获取总条数
        const total = result.data.message.total
        // 很据总条数计算总页数然后赋值
        this.data.total = Math.ceil(total / this.data.params.pagesize)
        // 获取商品数据
        let data = result.data.message.goods
        // 将商品数据进行赋值
        this.setData({
          goodsList: [...this.data.goodsList,...data]
        })
        // 关闭下拉刷新
        wx.stopPullDownRefresh()
      })
  },
  // 页面上拉触底事件的处理函数 onReachBottom
  onReachBottom() {
    // 判断是否还有下一页数据
    if (this.data.params.pagenum >= this.data.total) {
      // 没有下一页数据则提示
      wx.showToast({title: '后面没有商品了哦！',});
    } else {
      // 还有下一页数据则修改页码重新获取新的数据
      this.data.params.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉事件函数 onPullDownRefresh()
  onPullDownRefresh(){
    // 清空数组
    this.setData({
      goodsList:[]
    })
    // 将页码重置为1
    this.data.params.pagenum = 1
    // 重新发送数据请求
    this.getGoodsList()
  }
})