Component({
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  data: {

  },
  methods: {
    active(e){
      // 获取点击的索引
      const {index} = e.currentTarget.dataset
      // 触发父组件中的自定义事件
      this.triggerEvent("tabItemChange",{index})
    }
  }
})
