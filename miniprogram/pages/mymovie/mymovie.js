// pages/mymovie/mymovie.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    images:[],
    fileIds:[]
  },
  onContentChange:function(e){
    // 功能：输入双向绑定
    // 1：添加参数event
    // 2：获取event.detail保存content
    this.setData({
      content:e.detail
    })
  },
  submit:function(){
    // 功能一：上传一张指定图片images，将图片fileID保存
    // 功能二：将留言/fileID添加云数据库
    // 1：显示加载提示框
    wx.showLoading({
      title: '正在提交...',
    })
    // 2：获取选中文件文件名
    if(this.data.images.length==0){
      wx.showToast({
        title: '请选择图片',
      })
      return;
    }
    var item = this.data.images[0];
    // 3：使用正则表达式获取文件名后缀
    var su = /\.\w+$/.exec(item);
    // 4：创建新文件名 时间+随机数+后缀
    var newFile = new Date().getTime();
    newFile+=Math.floor(Math.random()*999);
    newFile+=su;
    // 5：上传图片
    wx.cloud.uploadFile({
      cloudPath: newFile,  //新文件名
      filePath: item,      //原文件名
      success: (res) => {    //上传成功
      // 12：将上传成功fileID保存数组
      var fid = res.fileID; //图片路径
      // 6：指定上传图片新文件名/选中文件
      // 7：上传成功获取当前文件fileID
      // 8：获取评论内容
      // 9：在云开发控制面板中创建集合
      // 10：添加数据库对象
      // 11：将fileID/内容添加集合中
      // 12：隐藏加载提示框
      console.log(fid);
      var m = this.data.content;
      db.collection("mymovie1906")
        .add({
          data:{
          content: m,
          fileIds: fid
          }
        })
        .then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '保存成功!' 
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    })
  },
  selectImg:function(){
    // 功能1：获取用户选中图片并保存images:[]
    // 1：显示加载提示框
    wx.showLoading({
      title: '正在上传图片...',
    })
    // 2：选择一张图片
    wx.chooseImage({
      // 3：类型
      // 4：来源
      // 5：选择功能
      // 6：将当前图片保存对象中
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success:(res)=>{
        var list = res.tempFilePaths;
        this.setData({
          images:list
        })
        wx.hideLoading();
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})