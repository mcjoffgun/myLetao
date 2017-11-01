$(function () {
    var currentPage = 1;
    var pageSize = 5;
  //模板引擎
    function rendor() {
      $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
          page:currentPage,
          pageSize:pageSize
        },
        success:function (data) {
          // console.log(data);
          $("tbody").html(template("tpl2",data));
          $("#pagintor").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:currentPage,//当前页
            totalPages:Math.ceil(data.total / pageSize),//总页数
            size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked:function(event, originalEvent, type,page){
              //为按钮绑定点击事件 page:当前点击的按钮值
              currentPage = page;
              rendor();
            }
          });
        }
      })
    }
  rendor();
  //点击添加分类，显示模态框
  $(".btn_add").on("click",function () {
      $("#myModal4").modal("show");
    //获取一级分类名称
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        // 页数和显示的行数自己填的，这两个固定属性必须要有
        page:1,
        pageSize:100
      },
      success:function (data) {
        // console.log(data);
        $(".dropdown-menu").html(template("tpl3",data));
      }
    })
  })

  //将下拉菜单中的值显示在dropdown_text中
  //动态生成，需要委托事件
  var validator = $("#form").data('bootstrapValidator');
  $(".dropdown-menu").on("click","a",function () {
      $(".dropdown_text").text($(this).text());
  //  获取当前li中a标签的一级分类id， 通过自定义属性来改变隐藏域的value值,

    $("#categoryId").val($(this).data
    ("id"));
    //校验id更新成功
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })

//  上传图片，使用插件
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e,data) {
    //    修改上传图片的路径
    //   console.log(data);
    //   result
    //     :
    //   {picAddr: "/upload/brand/f1b5dc80-be53-11e7-9e3f-432bc2dca9d9.jpg"}
    //   给默认图片更改路径，显示在前端页面
        $(".img_box img").attr("src",data.result.picAddr);
      //隐藏域的作用，表单提交时，将设置的名称和值发送到服务器
      $("#brandLogo").val(data.result.picAddr);
      // 校验成功更新状态
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  })
//  校验表单
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  })
//  放松ajax请求
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      success:function (data) {
        if(data.success){
          $("#myModal4").modal("hide");
          currentPage = 1;
          rendor();
          $("#form").data("bootstrapValidator").resetForm();
          $("form")[0].reset();
          $(".dropdown_text").text("请选择一级分类名称");
          $(".img_box img").attr("src","images/none.png");
        }
      }
    })
  });

})
