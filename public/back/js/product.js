$(function () {
    var currentPage = 1;
  var pageSize = 3;
  //定义一个空数组用来存储上传图片个数
  var imgArray = [];
  // 渲染和分页
function rendor() {
  $.ajax({
    type:"get",
    url:"/product/queryProductDetailList",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function (data) {
      // console.log(data);
      $("tbody").html(template("tpl",data));
      // console.log($("tbody").html(template("tpl5"), data));
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
 // 给添加商品绑定点击事件，显示模态框,并渲染模板引擎，判断brandId状态
  $(".btn_add").on("click",function () {
      $("#myModal4").modal("show");
  //  获得二级分类信息填入下拉列表框
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function (data) {
          $(".dropdown-menu").html(template("tpl1",data));
      //  点击li时将li数据填充到span中
        $(".dropdown-menu").on('click','li',function () {
            $(".dropdown_text").text($(this).text());
          //给隐藏域传入一级分类的brandId
          $("#brandId").val($(this).data("id"));
          $("#form").data('bootstrapValidator').updateStatus("brandId","VALID");
        })
      }
    })

  })
//  校验表单
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded:[],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '二级分类不能为空'
          },
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品名称不能为空'
          },
          //长度校验
          stringLength: {
            min: 1,
            max: 30,
            message: '商品名称长度必须在6到30之间'
          },
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          },
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品库存不能为空'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存大于0'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品现价不能为空'
          },
          //长度校验
          // stringLength: {
          //   min: 6,
          //   max: 30,
          //   message: '用户名长度必须在6到30之间'
          // },
          //正则校验
          // regexp: {
          //   regexp: /^[a-zA-Z0-9_\.]+$/,
          //   message: '用户名由数字字母下划线和.组成'
          // }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品原价不能为空'
          },
          //长度校验
          // stringLength: {
          //   min: 6,
          //   max: 30,
          //   message: '用户名长度必须在6到30之间'
          // },
          //正则校验
          // regexp: {
          //   regexp: /^[a-zA-Z0-9_\.]+$/,
          //   message: '用户名由数字字母下划线和.组成'
          // }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品尺寸不能为空'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的尺码（30-50）'
          }
        }
      },
      productLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传三张图片'
          },
        }
      },
    }

  });
//  初始化图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //每次图片上传完成都会执行这个回调函数
    done:function(e, data){
      //data.result.picAddr存储了图片的地址。
      console.log(data);
      // 向每个匹配的元素内部追加内容。
      $(".img_box").append('<img src=" '+ data.result.picAddr+' " style="width: 80px;height: 80px;">');
    var ig= imgArray.push(data.result);
      // console.log(ig);
// 如果数组的长度为3了，因为规定必须上传3张图片
      if (imgArray.length === 3){
        $("#form").data('bootstrapValidator').updateStatus("productLogo","VALID");
      }else{
        $("#form").data('bootstrapValidator').updateStatus("productLogo","INVALID");
      }
    }
  });
  // 注册表单验证成功事件
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var param = $("#form").serialize();
    // console.log(param);brandId=8&proName=111&proDesc=2222&num=222&price=22222&oldPrice=222222&size=30-58&productLogo=1
    // "picName":"24-1.png","picAddr":"product/24-1.png
    // 表单中的内容需要拼接上图片要求的格式一起发送到后台
    param +="&picName="+imgArray[0].picName + "&picAddr="+imgArray[0].picAddr;
    param +="&picName="+imgArray[1].picName + "&picAddr="+imgArray[1].picAddr;
    param +="&picName="+imgArray[2].picName + "&picAddr="+imgArray[2].picAddr;
    $.ajax({
       type:"post",
      url:"/product/updateProduct",
      data:param,
      success:function (data) {
          if(data.success){
            //关闭模态框
            $("#myModal4").modal("hide");
            // 渲染第一页
            currentPage = 1;
            rendor();
            // 重置表单中设置过校验的内容，将隐藏所有错误提示和图标。对表单内容也要重置
            $("#form")[0].reset();
            $("#form").data('bootstrapValidator').resetForm();
          //  移除照片，文本恢复
            $(".img_box img").remove();
            $(".dropdown_text").text("请选择二级分类名称");
            // 照片数组清空
       imgArray = [];
          }

      }
    })
  });
})
