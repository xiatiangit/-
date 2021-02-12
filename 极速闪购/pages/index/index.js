import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList:[],
    // 排列楼层页面数据
    floorList:[]
  },
  //页面开始加载时触发
  onLoad: function (options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  // 获取轮播图数据函数
  getSwiperList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(result => {
        let data = result.data.message
        this.setData({
          swiperList: data
        })
      })
  },
  // 获取导航数据函数
  getCatesList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result => {
      let data = result.data.message
      this.setData({
        catesList:data
      })
    })
  },
  // 获取排列楼层页面数据
  getFloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result => {
      let data = result.data.message
      this.setData({
        floorList:data
      })
    })
  },
});
