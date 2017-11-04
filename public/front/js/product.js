$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
  });

  var id = tools.getParam("productId");
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    success: function (data) {
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
      $(".lt_content").html(template("tpl", data));
      mui('.mui-slider').slider({
        interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
        // mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
      });
      mui(".mui-numbox").numbox();
    }
  });
  //给尺码添加背景色
  $(".lt_content").on("click", ".size", function () {
    // console.log(11);
    $(this).addClass("new").siblings().removeClass("new");
  });
//  给购物车添加点击事件
  $(".lt_cart").on("click", function () {
    // 尺码需要选中
    var size = $(".lt_content .size.new" +
      "").html();
    var num = $(".mui-numbox-input").val();
    if(!size){
      mui.toast("请选择尺码");
      return ;
    }
    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:id,
        size:size,
        num:num
      },
      success:function (data) {
        console.log(data);
        if(data.success){
        mui.toast("添加成功啦！");
        }
        if(data.error === 400){
          location.href="login.html?reURL="+ location.href;
        }
      }
    })
  })

})