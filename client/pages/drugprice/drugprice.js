// 获取全局应用程序实例对象
const app = getApp();
var AV = require('../../vendor/av-weapp-min.js');

// 创建页面实例对象
Page({
    /**
     * 页面名称
     */
    name: "drugprice",
    /**
     * 页面的初始数据
     */

    data: {
        products: []


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        new AV.Query('Products')
            .descending('createdAt')
            .find()
            .then(products => this.setData({ products }))
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

})