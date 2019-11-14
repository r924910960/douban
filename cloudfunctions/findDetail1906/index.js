// 云函数入口文件
const cloud = require('wx-server-sdk')
// 1:引入request-promise库
const rp = require("request-promise");

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 2：创建变量url地址
  var url = `http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  // 3：发送ajax请求并返回结果
  return rp(url).then(res=>{
    return res;
  }).catch(err=>{
    console.log(err);
  })
}