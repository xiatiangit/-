import { request } from '../../request/index.js'
Page({
  data: {
    searchData:[],
    isValue:""
  },
  onShow:function(){
    
  },
  // 搜索
  search(e){
    let {value} = e.detail
    this.setData({
      value
    })
    this.getData(value)
  },
  // 获取搜索数据
  getData(val){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",data:{query:val} })
    .then(result => {
      let searchData = result.data.message
      this.setData({
        searchData
      })
    })
  },
  // 跳转
  jump(e){
    let {goodsid} = e.currentTarget.dataset
    console.log(goodsid);
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goods_id='+goodsid,
    });
  },
  // 取消
  cancel(){
    this.setData({
      isValue:'',
      searchData:[]
    })
  }
})