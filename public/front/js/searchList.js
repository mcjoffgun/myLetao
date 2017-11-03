mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});
//思路：
//1. 获取地址栏的参数，设置到文本框中.
//2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
//3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
//4. 点击排序，需要对商品进行排序。
//5. 添加一个遮罩效果
var data = {
  proName: "",
  brandId: "",
  price: "",
  num: "",
  page: 1,
  pageSize: 10
}
function render(data) {
  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: data,
    success: function (data) {
      console.log(data);
      setTimeout(function () {
        $(".det_show").html(template("tpl", data));
      },1000);

    }
  })
}
var key = tools.getParam("key");
$(".input_key").val(key);
data.proName = key;
render(data);
//给搜索按钮添加点击事件
$(".btn_search").on("click", function () {
  //点击搜索按钮，样式重置
  $(".det_info a[data-type]").removeClass("new");
  $(".det_info span").removeClass("fa-angle-up").addClass("fa-angle-down");
  data.price = "";
  data.num = "";
  // 实现搜索功能，上面搜索的对应下面图片
  var key = $(".input_key").val().trim();
  if (key === "") {
    mui.toast("请输入搜索内容");
  }
  $(".det_show").html('<div class="loading"> </div>')
  data.proName = key;
  render(data);
})
$(".det_info a[data-type]").on("click", function () {
  var $this = $(this);
 var $span = $this.find("span")
  if ($this.hasClass("new")) {
    $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up")
  } else {
    $(this).addClass("new").siblings().removeClass("new");
   $span.removeClass("fa-angle-up").addClass("fa-angle-down");
  }
//后台文档接口
//   price 使用价格排序（1升序，2降序）
// num 产品库存排序（1升序，2降序）
  var type = $(this).data("type");
  var value = $span.hasClass("fa-angle-down") ? 2 : 1;
  // console.log(value);
  // console.log(type);
  //data.price / data.num
  data[type] = value ;
  render(data);
})
