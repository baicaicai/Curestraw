// 获取全局应用程序实例对象
const app = getApp();
var AV = require('../../vendor/av-weapp-min.js');
const user = AV.User.current();
Page({
  data: {
    orders: [
      {
        title: '',
        price: '',
        state: '',
        receiveName: '',
        receivePhone: '',
        receiveAddress: '',
        ownerUsername: '',
        createTime: '',
        updateTime: '',
      }
    ],
  },
  onLoad: function (option) {
   
  },
  onShow: function (option) {
    this.LoadOrderData();
  },
  LoadOrderData: function() {
    var that = this;

    var query = new AV.Query('order_info');
    query.include('owner');
    query.descending('createdAt')
    query.find()
      .then(
      function (orders) {
        // console.log("orders.length"+orders.length);
        // console.log(orders);
        for (var i = 0; i < orders.length; i++) {
          var param = {};
          var string = "orders[" + i + "].title";
          param[string] = orders[i].get('title');
          that.setData(param);

          var string = "orders[" + i + "].price";
          param[string] = orders[i].get('price');
          that.setData(param);

          var string = "orders[" + i + "].state";
          var stateCode = orders[i].get('state');
          if (stateCode == 0) param[string] = "待付款";
          else if (stateCode == 10) param[string] = "待发货";
          else if (stateCode == 20) param[string] = "待收货";
          else if (stateCode == 99) param[string] = "已完成";
          else param[string] = "待付款";
          that.setData(param);

          var string = "orders[" + i + "].receiveName";
          param[string] = orders[i].get('receive_name');
          that.setData(param);

          var string = "orders[" + i + "].receivePhone";
          param[string] = orders[i].get('receive_phone');
          that.setData(param);

          var string = "orders[" + i + "].receiveAddress";
          param[string] = orders[i].get('receive_address');
          that.setData(param);

          var string = "orders[" + i + "].ownerUsername";
          param[string] = orders[i].get('owner').get('username');
          that.setData(param);

          var string = "orders[" + i + "].createTime";
          param[string] = orders[i].createdAt.getFullYear() + '/' + (orders[i].createdAt.getMonth() + 1) + '/' + orders[i].createdAt.getDate() + ' ' + orders[i].createdAt.getHours() + ':' + orders[i].createdAt.getMinutes() + ':' + orders[i].createdAt.getSeconds();
          that.setData(param);

          var string = "orders[" + i + "].updateTime";
          param[string] = orders[i].updatedAt.getFullYear() + '/' + (orders[i].updatedAt.getMonth() + 1) + '/' + orders[i].updatedAt.getDate() + ' ' + orders[i].updatedAt.getHours() + ':' + orders[i].updatedAt.getMinutes() + ':' + orders[i].updatedAt.getSeconds();
          that.setData(param);


        }
        // var order = that.data.orders;
        // console.log(order);
        // that.setData({ orders: order })
      }
      )
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  },
})
