// 获取全局应用程序实例对象
const app = getApp();
var AV = require('../../vendor/av-weapp-min.js');

Page({
  data: {
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
    userPhone:''
  },
  onLoad: function () {
    var that = this;
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
  wechatLogin: function (e) {
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
      user.setMobilePhoneNumber({ userPhone });
      return user.save();
    }).then(user => {
      // 发送验证短信
      return AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber());
    }).then({
  // 用户填写收到短信验证码后再调用 AV.User.verifyMobilePhone(code) 完成手机号的绑定
  // 成功后用户的 mobilePhoneVerified 字段会被置为 true
  // 此后用户便可以使用手机号加动态验证码登录了
    }).catch(console.error);
  },
})
