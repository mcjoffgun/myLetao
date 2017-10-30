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
        console.log(data);
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

  render();
})