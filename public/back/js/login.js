// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位
$(function () {
  $("#form").bootstrapValidator({

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //validators验证者
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //  手动为更新字段添加一个信息
          callback:{
            message:"用户名错误"
          }
        },

      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          // //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
            message:"密码错误"
        },

        }
      },
    }
  });
  //获取表单校验实例
  var validator = $("#form").data('bootstrapValidator');
  // console.log(validator);
  //初始化表单校验成功后注册表单成功事件
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      success:function (data) {
       if(data.success){
         location.href = "index.html";
       }else{
         if(data.error === 1000){
           // BootstrapValidator默认在校验某个字段合法后不再重新校验，当调用其他插件或者方法可能会改变字段值时，需要重新对该字段进行校验。可以使用updateStatus(field, status, validatorName)方法更新字段的状态
           // - NOT_VALIDATED：未校验的
           // - VALIDATING：校验中的
           // - INVALID ：校验失败的
           // - VALID：校验成功的。
          validator.updateStatus("username","INVALID","callback");
         }
         if(data.error === 1001){
           validator.updateStatus("password","INVALID","callback");
         }
       }
      }
    })
  });
  $("[type = 'reset']").on("click",function () {
    validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
  })
})
//使用表单校验插件



