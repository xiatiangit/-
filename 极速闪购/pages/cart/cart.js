Page({
  data: {
    address: {},
    goods: [],
    // 全选
    allCheck: false,
    // 总价格
    allPrice: 0,
    // 总数量
    allNum: 0,
  },
  // onShow和onLoad的区别：
  // onShow：页面从哪里进来，只要返回该页面就会加载；从二级页面回来时会触发的
  // onLoad：页面加载的时候触发，只触发一次；从二级页面回来时不会触发
  onShow: function () {
    this.judge()
    // 获取缓存中购物车内商品的信息
    const cart = wx.getStorageSync("cart") || []
    if (cart.length !== 0) {
      this.judge()
    }
    // 获取缓存中的地址信息
    const data = wx.getStorageSync("address");
    this.setData({
      address: data,
      goods: cart,
    })
  },
  // 获取收货地址
  getAddress() {
    // 点击之后触发获取地址api
    wx.chooseAddress({
      success: (result) => {
        // 将地址信息存入到缓存当中
        wx.setStorageSync("address", result);
      },
    });
  },
  // 全选
  check() {
    this.data.allCheck = !this.data.allCheck
    let { goods } = this.data
    goods.forEach(v => v.check = this.data.allCheck)
    this.setData({
      goods
    })
    wx.setStorageSync("cart", goods);
    this.judge()
  },
  // 选择框点击
  checkChange(e) {
    let { index } = e.currentTarget.dataset
    let { goods } = this.data
    goods[index].check = !goods[index].check
    this.setData({
      goods
    })
    wx.setStorageSync("cart", goods);
    this.judge()
  },
  // 判断全选和计算数量和总价
  judge() {
    let cart = wx.getStorageSync("cart")||[];
    // 判断数据是否都选中
    //  every  数组方法，会遍历数组，当所有结果都为true才返回true，空数组使用也会返回true
    const allCheck = cart.length ? cart.every(v => v.check) : false
    // 计算总价格和总数量
    let allPrice = 0
    let allNum = 0
    cart.forEach(v => {
      if (v.check) {
        allNum += v.num
        allPrice += v.num * v.goods_price
      }
    })
    this.setData({
      allNum,
      allPrice,
      allCheck
    })
  },
  // 商品数量点击减少
  numSub(e) {
    let { goods } = this.data
    let { index } = e.currentTarget.dataset
    if (goods[index].num <= 1) {
      // 数量小于零点击后提示是否删除商品
      wx.showModal({
        title: '删除',
        content: '是否删除此商品',
        success: (result) => {
          if (result.confirm) {
            // 删除商品
            goods.splice(index, 1)
            this.setData({
              goods
            })
            wx.setStorageSync("cart", goods);
            this.judge()
          } else {
            goods[index].num
          }
        },
      });
    } else {
      goods[index].num--
      this.setData({
        goods
      })
      wx.setStorageSync("cart", goods);
      this.judge()
    }
  },
  // 商品数量点击增加
  numAdd(e) {
    let { goods } = this.data
    let { index } = e.currentTarget.dataset
    goods[index].num++
    this.setData({
      goods
    })
    wx.setStorageSync("cart", goods);
    this.judge()
  },
  // 商品结算
  settlement(){
    let {goods,address,jump} = this.data
    // 判断购物车是否有商品
    if(goods.length !== 0){
      // 判断是否有收货地址
      if(address !== ""){
        // 跳转到结算页面
        wx.navigateTo({
          url: '../pay/pay',
        });
      }else{
        // 没有收货地址则提示
        wx.showToast({
          title: '请填写收货地址',
          icon: 'none',
        });
      }
    }else{
      // 没有商品则提示
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
      }); 
    }
  }
})