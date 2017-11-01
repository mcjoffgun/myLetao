// 后台接口文档,查询用户
$(function () {
  var currentPage = 1;
  var pageSize = 3;

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $("tbody").html(template("tpl", data));
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(data.total / pageSize),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }
        });
      }
    })
  }
  render();
//给添加分类按钮注册点击事件,显示模态框
  $(".btn_add").on("click", function () {
    $("#myModal3").modal("show");
  })
  // 校验表单
  var $form = $("#form");
  $form.bootstrapValidator({
    //校验时使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //name属性
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类名称不能为空"
          }
        }
      }

    }
  });

    // 将添加分类模态框里面的内容加入到一级分类中
// 表单验证成功时注册一个成功事件
//   实例化表单校验的validator
  var validator = $form.data("bootstrapValidator");
    $form.on("success.form.bv",function (e) {
        e.preventDefault();
      $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data:$form.serialize(),
        success: function (data) {
          if(data.success){
            // 关闭模态框
            $("#myModal3").modal("hide");
            // 重新渲染第一页，因为最新的添加是在第一页展示
            currentPage = 1;
            render();
            //重置表单
            validator.resetForm();// 重置表单，隐藏所有的错误提示和图标
            //还需要重置表单中的内容,第一个form
            $form[0].reset();
          }
        }
      })
    })
})