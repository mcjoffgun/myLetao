// 参数列表的封装
// 写成对象的形式
//获取地址栏中的参数
var tools = {
  getParamObj: function () {
    var obj = {};
    var search = location.search;
    //将？去掉
    search = search.slice(1);
    // 用&进行切割，得到一个数组
    var searchArr = search.split("&");
    for (var i = 0; i < searchArr.length; i++) {
      var key = searchArr[i].split("=")[0];
      var value = decodeURI(searchArr[i].split("=")[1]);
      obj[key] = value;
    }
    return obj;
  },
  getParam: function (key) {
    return this.getParamObj()[key];
  }
}