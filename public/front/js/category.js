
var sc = mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators:false
});
// console.log(sc);
//前端接口,一级分类
$.ajax({
  type:"get",
  url:"/category/queryTopCategory",
  success:function (data) {
    console.log(data);
    $(".lt_category_l ul").html(template("tpl",data));
    //刚开始打开页面默认第一个显示
    getSecond(data.rows[0].id);
  }
})
// 二级分类,给li注册点击事件，动态生成
function getSecond(id) {
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    data:{
      id:id,
    },
    success:function (data) {
      $(".lt_category_r ul").html(template("tpl1",data));
    }
  })
}
$(".lt_category_l ul").on("click","li",function () {
  var id = $(this).data("id");
  $(this).addClass("now").siblings().removeClass("now");
  getSecond(id);
  // 让右侧区域滚动到0，0
  sc[1].scrollTo(0,0,500);
})