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
          this.loadWeChatInfo(this);
        }).catch(console.error);
      }
      this.setData({
        userPhone: app.globalData.user ? app.globalData.user.mobilePhoneNumber:''
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

    loadWeChatInfo: function (that) {
      var vc = AV.User.current();
      wx.getUserInfo({
        success: function (res) {
          that.checkUserInfo(res.userInfo);
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    },

    checkUserInfo: function (userInfo) {
    var query = new AV.Query('User_weChat_Info');
    query.equalTo('userId', AV.User.current().id);
    //query.equalTo('userName', 'mytest');
    query.find().then(function (otherUsers) {
      var isFind = false;
      otherUsers.forEach(function (user_Info) {
        isFind = true;
        if (app.globalData.user != null)
        {
          user_Info.set('phone',app.globalData.user.mobilePhoneNumber);
        }
        if (userInfo!= null) {
          user_Info.set('city', userInfo.city);
          user_Info.set('nickName', userInfo.nickName);
          user_Info.set('sex', userInfo.gender);//性别 0：未知、1：男、2：女
        }
        if (AV.User.current() != null) {
          user_Info.set('userName', AV.User.current().attributes.username);
        }
        user_Info.save().then(function (user_Info) {
          console.log('otherUserid=' + user_Info.id);
        },
          function (error) {
            console.log(error);
          });
      });
      if (!isFind) {
        var User_Info = AV.Object.extend('User_weChat_Info');
        // 新建对象
        var user_Info = new User_Info();
        if (app.globalData.user != null) {
          user_Info.set('phone', app.globalData.user.mobilePhoneNumber);
        }
        if (userInfo != null) {
          user_Info.set('city', userInfo.city);
          user_Info.set('nickName', userInfo.nickName);
          user_Info.set('sex', userInfo.gender);//性别 0：未知、1：男、2：女
        }
        if (AV.User.current() != null) {
          user_Info.set('userName', AV.User.current().attributes.username);
          user_Info.set('userId', AV.User.current().id);
        }
        user_Info.save().then(function (user_Info) {
          console.log('objectId is ' + user_Info.id);
        }, function (error) {
          console.error(error);
        });
      }
    },
      function (error) {
        console.log(error);
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
      });
  },

})