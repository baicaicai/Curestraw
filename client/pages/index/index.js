// 获取全局应用程序实例对象
const app = getApp();
var AV = require('../../vendor/av-weapp-min.js');
// 创建页面实例对象
Page({
  data: {
    userPhone: '',
    username: ''
  },
    /**
     * 页面名称
     */
    name: "index",
    /**
     * 页面的初始数据
     */

    data: {

        todos: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      if (app.globalData.user == null)      
      {
        AV.User.loginWithWeapp().then(user => {
          app.globalData.user = user.toJSON();
        }).catch(console.error);
      }
      this.setData({
        userPhone: '13651098773'
      });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        new AV.Query('Todo')
            .descending('createdAt')
            .find()
            .then(todos => this.setData({ todos }))
            .catch(console.error);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },


    //以下为自定义点击事件

    tap_0e018233: function(e) {},

    updateUserPhone: function ({
    detail: {
      value
    }
  }) {
      this.setData({
        userPhone: value
      });
    }, 

    specialistScheme: function() {
      //console.log("1-" + this.data.userPhone);
      //console.log("1-" + app.globalData);
      if (app.globalData.user == null || app.globalData.user.mobilePhoneVerified!=true)
      { 
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
      else {
        wx.navigateTo({
          url: '/pages/dig1/dig1'
        })
      }
    },


    loginbyphone: function () {
      //console.log("1-" + this.data.userPhone);
      //console.log("1-" + app.globalData);
      wx.navigateTo({
        url: '/pages/userinfo/userinfo?userPhone=' + this.data.userPhone
      })
    },

})