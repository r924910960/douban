// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    start:0
  },
  //加载更多
  loadMore:function(){
    // 1.调用云函数
    wx.cloud.callFunction({
      name: "movielist1906",  //云函数名
      data: {
        // 2.传递start
        start: this.data.start,
      }
    })
      .then(res => {      //成功回调
        // 3.获取云函数返回结果并且保存list
        var rows = JSON.parse(res.result) 
        rows = this.data.list.concat(rows.subjects);
        this.setData({
          list:rows
        })
        console.log(this.data.list);
      })
      .catch(err => {     //失败回调
        console.log(err)
    })
  },
  //详情页面跳转
  jumpComment:function(e){
    // 1:添加参数e事件对象
    // 2:依据e获取自定义属性id
    var id = e.target.dataset.id;
    console.log(id);
    // 3:跳转pages/comment/comment参数id
    var url = "../detail/detail?id="+id
    wx.navigateTo({ url:url,})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
    this.setData({
      start:this.data.start+4,
    })
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})