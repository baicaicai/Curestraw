//const AV = require('../../libs/av-weapp-min.js');
const AV = require('../../utils/leancloud-storage');
const Todo = require('../../model/todo');
const TestObjectValueData = require('../../model/testObjectValueData');

Page({
  data: {
    todos: [],
    editedTodo: {},
    draft: '',
    editDraft: null,
    TestObjectValue:[]
  },

  updateDraft: function ({
    detail: {
      value
    }
  }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      draft: value
    });
  },
 
  addTodo: function () {
   var TestObject = AV.Object.extend('TestObject');
   var testObject = new TestObject();
   testObject.save({
        testabc: 'abc123'
   }).then(function() {
     alert('LeanCloud works!');
   }).catch(function(err) {
     alert('error:' + err);
   });
  },
  addSearch: function () {
    // console.log(TestObjectValue.count);
    var TestObject = AV.Object.extend('TestObject');
     var query = new AV.Query(TestObject);
  //query.descending('createdAt');
    // var query = new AV.Query(AV.Object.extend('TestObject'));

  //query.queryString('*');
  query.find().then(TestObjectValue => this.setData({ 
        TestObjectValue: TestObjectValue.map(testObjectValueData => Object.assign(testObjectValueData.toJSON(), {
          testabc: testObjectValueData.testabc.toLocaleString(),
        }))
      }))
  console.log(TestObjectValue.count);
  
    //Process results
  
  },
  addSearch1: function () {
    var TestObject = AV.Object.extend('TestObject');
     var query = new AV.Query(TestObject);
  //query.descending('createdAt');
    // var query = new AV.Query(AV.Object.extend('TestObject'));

  //query.queryString('*');
  query.find().then(function(results) {
     console.log(results[0].get('testabc'));
    that.setData( {
           TestObjectValue: TestObjectValue.map(testObjectValueData => Object.assign(testObjectValueData.toJSON(), {
          testabc: testObjectValueData.testabc.toLocaleString(),
        }))
        });
    console.log(results[0].get('testabc'));
    //Process results
 }, function(err) {
   console.log('err');
 }
 );
  
  },
  addSearch2: function () {
     var TestObject = AV.Object.extend('Todo');
   var query = new AV.Query(TestObject);
  query.descending('createdAt');
  query.find().then(function(results) {
 console.log('results'+results[0].get('content'));
  },function(err) {
console.log('err'+ err);
  })},
    addSearch3: function () {
     var TestObject = AV.Object.extend('Todo');
   var query = new AV.Query(TestObject);
  query.descending('createdAt');
  query.find().then(function(results) {
 console.log('results'+results[0].get('content'));
 var testa;
 var ret=(results, Object.assign) ;
     console.log(ret);
  },function(err) {
console.log('err'+ err);
  })},
   addSearch3: function () {
    var TestObject = AV.Object.extend('TestObject');
     var query = new AV.Query(TestObject);
  //query.descending('createdAt');
    // var query = new AV.Query(AV.Object.extend('TestObject'));
var myThis=this;
  //query.queryString('*');
  query.find().then(function(results) {
     console.log(results[1].get('testabc'));

  //
  const aaa= results.map
           (
                 function(order){
               // order =>order.toJSON()
               var cc=order.toJSON();
                 return order;
             }
             
           );
 // aaa: results.map
    //       (
     //        function(order){
        //         console.log("order: "+order);
        //         return order;
        //     }
             
        //   );
      //
    console.log(aaa);
     myThis.setData({
      TestObjectValue:aaa
    });
      console.log(aaa);
    //Process results
 }, function(err) {
   console.log('err');
 }
 );},
});