/**
 * Created by july on 2017/10/29.
 */
$(function () {
  // 判断是否是登录状态
  if(location.href.indexOf("login.html") <= 0){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (data) {
        console.log(data);
        if(data.error === 400){
        location.href = "login.html";
        }
      }
    })
  }
  // 点击.child的上一个兄弟元素时，$(this)指的是$(".child").prev(),.chlid显示
   $(".child").prev().on("click",function () {
       $(this).next().slideToggle();
   })
  $(".lt_nav a").on("click",function () {
      $(".lt_nav a").removeClass("new");
    $(this).addClass("new");
  });
  $(".category").on("click",function () {
      $(this).removeClass("new");
  })
// 进度条
  $(document).ajaxStart(function () {                    NProgress.start();
  });
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });
//  点击小图标，侧边栏显示和隐藏
  $(".lt_main .main_header .icon_menu").on("click",function () {
    $(".lt_aside").toggleClass("new");
    $(".lt_main ").toggleClass("new");
  });
  // 共用退出功能
  $(".lt_main .icon_out").on("click",function () {
    $('#myModal').modal('show');
  });
  //点击确定按钮，跳到登录页面
  $(".modal-footer .sure").on("click",function () {
    // 发送一个ajax请求，告诉服务器我要退出了，服务器会清空你的session
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        // 不用再传data数据，只是一个button按钮
        // data:"",
        success:function (data) {
          console.log(data);
          if(data.success){
          // .location.href是window的属性
            window.location.href="login.html";
          }
        }
      })
  })
})