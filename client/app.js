/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var AV = require('./vendor/av-weapp-min.js');
//var wilddog = require('wilddog-weapp-all');


App({
    /**
     * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
     */
    onLaunch() {
        qcloud.setLoginUrl(config.service.loginUrl);

        AV.init({
            appId: '5E1AAuPh4XpujiDnxGNKo8t3-gzGzoHsz',
            appKey: 'TohXj4W2SNACyItgiwkAHTHg',
        });
      
        console.log(AV);
      //  wilddog.initializeApp(config)
      //  this.todoRef = wilddog.sync().ref('todo').orderByPriority().limitToFirst(20)
     
    },
    
    wilddogSign: function (text) {
       /*
      wilddog.auth().signInWeapp().then(function (user) {
        wx.showToast({
          title: '登录成功！请输入房间号',
          icon: 'success',
          content: '成功1',
          duration: 2000
        })
        return true;
        var user = wilddog.auth().currentUser;
        var isAnonymous = user.anonymous;
        var uid = user.uid;
      }).catch(function (err) {

      })*/
    },
    wilddogRoom: function (text) {
      /*
      wilddog.auth().signInWeapp().then(function (user) {
        wx.showToast({
          title: '登录成功！请输入房间号',
          icon: 'success',
          content: '成功1',
          duration: 2000
        })
        wilddogVideo.initialize({ 'appId': text, 'token': user.getToken()});
        wilddogVideo.createLocalStream({
          captureVideo: true,
          captureAudio: true,
          dimension: '480p',
          maxFPS: 15
        }).then(function (wdStream) {
          localStream = wdStream;
          localStream.attach(localEl);
        }).catch(function (err) {
          console.error(err);
        });
        return true;
        //var user = wilddog.auth().currentUser;
        //var isAnonymous = user.anonymous;
        //var uid = user.uid;
      }).catch(function (err) {
        wx.showToast({
          title: '登陆失败',
          content: '登陆失败',
          duration: 2000
        })
        return false;
      })*/
    },
    onHide: function () {
      //this.todoRef.goOffline();
    },
    onShow: function () {
     // this.todoRef.goOnline();
    },
     addItem: function (text) {
      this.ref.push(text)
    },
    getTodoRef: function () {
      return this.ref
    },
    getUserInfo: function (cb) {
      var that = this
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo)
      } else {
        //调用登录接口
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
        })
      }
    },
    globalData: {
      userInfo: null,
      wx_user:"123"
    }
});