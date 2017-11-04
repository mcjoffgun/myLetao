$(function () {
  $(".btn_login").on("click",function () {
    //[name='username']属性选择器
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    if(!username){
      mui.toast("请输入用户名");
      return ;
    }
    if(!password){
      mui.toast("请输入密码");
      return ;
    }
    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      success:function (data) {
        console.log(data);
        //登录成功，跳转到哪儿？
        //首先要获取到回跳的地址
        //如果已经登录成功，跳转到product商品页面
        if(data.success){
           var search = location.search;
          // 如果search里面包含有从商品页面传过来的reURL，说明要回跳
          if (search.indexOf("reURL") > -1){
            //replace()方法返回根据正则表达式进行文字复制后的字符串
            search = search.replace("?reURL=","");
             location.href = search
            // console.log(search);
          }
        //  如果想要退出重新登录时，跳转到用户登录页面
          else {
            location.href = "user.html";
          }
        }
        //如果没有登录名和密码错误，提醒错误原因
        if(data.error === 403){
              mui.toast(data.message);
        }
      }
    })
  })

})
