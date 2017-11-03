mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});

var id = tools.getParam("productId");
$.ajax({
  type:"get",
  url:"/product/queryProductDetail",
  data:{
    id:id
  },
  success:function (data) {
    console.log(data);
   var temp = data.size.split("-");
    // console.log(temp);
  // ["40", "50"]
  //    0:"40"
  //   1:"50"
    var sizeArray = [];
    for (var i = temp[0]; i < temp[1]; i++) {
    sizeArray.push(i);
    }
    // 给data增加一个属性
    data.sizeArray = sizeArray;
    $(".lt_content").html(template("tpl",data));
    mui('.mui-slider').slider({
      interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      // mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
    });
    mui(".mui-numbox").numbox();
  }
})
