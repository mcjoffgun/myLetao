$(function () {
  var currentPage = 1;
  var pagesize = 8 ;
  //将ajax封装为一个函数，下面分页点击事件时调用，
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pagesize
      },
      success:function (data) {
        var html = template("tpl",data);
        $("tbody").html(html);
        // data里面传入的有参数
        // console.log(data);
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(data.total/pagesize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            // 当点击某一页时调用函数，跳到当前页面
            render();
          }
        });
      }
    })
  }
//启用或禁用按钮，动态生成需要事件委托
  $("tbody").on("click","button",function () {
    $("#myModal2").modal("show");
    var id = $(this).parent().data("id");
    // console.log(id);
    var isDelete = $(this).parent().data("isDelete")
    // console.log(isDelete);
    //判断切换状态 data-is-delete={{v.isDelete}},v.isDelete是数字判断
    isDelete = isDelete === 1?0:1;
  // 给模态框确定按钮注册点击事件,切换按钮禁用启用状态，并关闭模态框
    $(".sure2").off().on("click",function () {
      // 后台接口文档
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (data) {
          console.log(data);
          if(data.success){
             //重新渲染一次数据并修改状态
             render();
        }
        }
      })
      $("#myModal2").modal("hide");
    })

  })
  render();
})