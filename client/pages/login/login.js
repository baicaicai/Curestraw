/** lgoin.js **/
var app = getApp();
var AV = require('../../vendor/av-weapp-min.js');
Page({
  data:{
    nickName: '',
    userInfoAvatar: '',
    sex: '',
    province: '',
    city: '',
    model: '',
    pixelRatio: '',
    windowWidth: '',
    windowHeight: '',
    language: '',
    version: '',
    platform: '',
    system: '',
    userPhone: '',
    userPhoneCheck: '',
    showPhoneView: true,
    showPhoneCheckView: false,
  },
  bindGoToMy: function(){
    wx.redirectTo({
      url: '../my/my'
    })
  },
 
  onLoad: function (option) {
    var that = this;
    if (app.globalData.user != null) {
      this.setData({
        userPhone: app.globalData.user.mobilePhoneNumber
      });
    } 
    //console.log(app.globalData.user.mobilePhoneNumber);
    //console.log("2userPhone-" + this.data.userPhone);
    //console.log("2-" + option.userPhone);
    wx.getUserInfo({
      success: function (res) {
        // var userInfo = res.userInfo //用户基本信息
        // var nickName = userInfo.nickName //用户名
        //var avatarUrl = userInfo.avatarUrl //头像链接
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        //var province = userInfo.province //所在省
        // var city = userInfo.city //所在市
        // var country = userInfo.country //所在国家
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        })
        switch (res.userInfo.gender) {
          case 0:
            that.setData({
              sex: '未知'
            })
            break;
          case 1:
            that.setData({
              sex: '男'
            })
            break;
          case 2:
            that.setData({
              sex: '女'
            })
            break;
        }
      },
      fail: function () {
        // fail
        console.log("获取失败！")
      },
      complete: function () {
        // complete
        console.log("获取用户信息完成！")
      }
    }),
      //获取系统信息
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            model: res.model,//  手机型号
            pixelRatio: res.pixelRatio,
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight,
            language: res.language,
            version: res.version,
            platform: res.platform,
            system: res.system//  操作系统版本
          })
        }
      })
  },

  userPhoneInput: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userPhone: value
    });
  },

  userPhoneCheckInput: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userPhoneCheck: value
    });
  },

  wechatLogin: function (e) {
    wx.showToast({
      title: '请等待..',
      icon: 'loading',
      duration: 5000
    })
    AV.User.loginWithWeapp().then(user => {
      app.globalData.user = user.toJSON();
      user.setMobilePhoneNumber(this.data.userPhone);
      //console.log(user.save());
      return user.save();
    }).then(user => {
     var isSuc=true;
     
     AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber()).then(user => {
       isSuc = true
       this.setData({
         showPhoneView: false,
         showPhoneCheckView: true,
       });
       wx.hideToast();
     }).catch(
       //没有异常也会进,暂时不知道catch怎么用
       isSuc = false
       );
       
    // console.log("isSuc=" + isSuc);
    // if (!isSuc)
    // {
    //   this.setData({
    //     showPhoneView: true,
    //     showPhoneCheckView: false,
   //    });
    // }
    // else
   //  {
     //    this.setData({
     //      showPhoneView: false,
    //       showPhoneCheckView: true,
    //  });
     //wx.hideToast();
    // app.globalData.user = user.toJSON();
    // }
     return user;
    }).then(
      {
        // 用户填写收到短信验证码后再调用 AV.User.verifyMobilePhone(code) 完成手机号的绑定
        // 成功后用户的 mobilePhoneVerified 字段会被置为 true
        // 此后用户便可以使用手机号加动态验证码登录了
      }).catch(console.error);
    console.log("rm");
  },

  wechatPhoneCheck: function (e) {
    console.log("cm-" + this.data.userPhoneCheck);
    wx.showToast({
      title: '请等待..',
      icon: 'loading',
      duration: 5000
    })
    if (this.data.userPhoneCheck != null && this.data.userPhoneCheck != '')
      AV.User.verifyMobilePhone(this.data.userPhoneCheck).then(user => {
        wx.hideToast();
        wx.showToast({
          title: '验证成功',
          duration: 5000
        })
        //重登陆刷新数据
        AV.User.loginWithWeapp().then(user => {
          app.globalData.user = user.toJSON();
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 2000)
        }).catch( console.error);
      }).catch(
        console.error
       // wx.showToast({
       //   title: '验证码错误',
      //    icon: 'error',
      //    duration: 2000
       // })
         //   setTimeout(function () {
         // wx.hideToast()
       // }, 3000)
      );
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})