/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var AV = require('./vendor/av-weapp-min.js');

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

        //console.log(AV);

    }


});