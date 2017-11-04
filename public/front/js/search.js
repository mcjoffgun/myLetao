mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});
// 需求：1 点击input框中的搜索按钮跳到搜索列表页
// 2 将关键字存储在localSTorage中，点击清除记录，能将所有记录删除
// 2.1 当记录中有重复的关键字时，将搜索的最新关键字放到最上面并删除原来的关键字
// 2.2 记录不能超过10条，超过10条，将最后一条清除
// 3 点击删除按钮时，将一条记录删除

// 获取本地数据,
 function getHistory() {
   var search_history = localStorage.getItem("lt_search_history") || "[]";
   var arr = JSON.parse(search_history);
   return arr;
 }

//将搜索历史页面动态渲染,
function rendor() {
  var arr =  getHistory();
  $(".lt_history").html(template("tpl",{arr:arr}));
  // console.log({arr:arr});
}
rendor();
//给搜索框注册添加点击事件
$(".btn_search").on("click",function () {
  //先获取到value的值
    var key = $(".input_key").val().trim();
    if(key === ""){
     mui.alert("你想买啥");
      return;
    }
  var arr=  getHistory();
    //如果有重复的记录，将原来的记录删掉，现在的添加上
if(arr.indexOf(key) > -1){
  // 将这条记录删除，splice返回移除的元素
  arr.splice(arr.indexOf(key),1);
}
  //记录不能超过十条，超过十条将最后一条删去
if(arr.length >= 10){
  // pop删除最后一条
  arr.pop();
}
  // 将key添加到arr数组中，unshift将指定的元素插入数组开始位置并返回该数组。
arr.unshift(key);
  localStorage.setItem("lt_search_history",JSON.stringify(arr));
// rendor();
location.href = "searchList.html?key="+key;
})
// 添加全部删除功能,动态生成,并重新渲染
$(".lt_history").on("click",".clear_all",function () {
    // 将所有的存储移除,并重新渲染
  // console.log(22);
  localStorage.removeItem("lt_search_history");
  rendor();
})
//添加单个删除功能，并重新渲染
$(".lt_history").on("click",".clear_single",function () {
  // 先把$this存储起来。下面有个  mui.confirm("你确定要删除此条记录吗","删除记录",btnValue,function (data)回调函数会将其覆盖
  var $this = $(this);
  var btnValue = ["是","否"];
    mui.confirm("你确定要删除此条记录吗","删除记录",btnValue,function (data) {
      // console.log(data);
      if(data.index === 0){
        var arr = getHistory();
        //获取动态生成元素的自定义属性中的下标
        var index = $this.data("index");
        //数组中移除该id
        arr.splice(index,1);
        // 一般我们会将JSON存入localStorage中，但是在localStorage会自动将localStorage转换成为字符串形式
        // 这个时候我们可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
        rendor();
        mui.toast("操作成功")
      }else{
       mui.toast("操作失败");
      }
    })
})

