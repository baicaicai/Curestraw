//index.js
//获取应用实例
var app = getApp()
Page({
  
  data: {
    current:null,
    appidEl: null,
    roomId: null,
    todos: []
  },
  bindKeyInput:function(e){
   // this.data.current = e.detail.value
  },
  bindKeyInput2: function (e) {
    //this.data.appidEl = 'wd0116612009zzudkl'
   // this.data.roomId = e.detail.value
  },
  wilddogSignRoom: function (e) {
    /*
    var isSuc=false;
    if (this.data.appidEl != null) {
      isSuc = app.wilddogSign(this.data.appidEl)
    }
    if (isSuc) {
      if (this.data.roomId != null) {
        isSuc = app.wilddogRoom(this.data.roomId)
      }
    }
    else
    {

    }*/
  },
  addItem: function(){
    /*
    wx.showToast({
      title: this.data.current,
      icon: 'success',
      content: '成功123',
      duration: 2000
    })
    if(this.data.current!=null){
      app.addItem(this.data.current)
    }*/
  },
  deleteItem:function(e){
   // var key = e.target.dataset.key
   // this.ref.child(key).remove()
  },
  onLoad: function () {
    // var newItem = { key: "key", text: "text" }
    // this.data.todos.push(newItem)
    // this.setData({
    //   todos: this.data.todos
    // })
    /*
    app.todoRef.bindAsArray(this, 'todo', function (err) {
      if (err != null) {
        // 数据绑定失败，失败原因：err.message;
      } else {
        // 数据绑定成功
      }
    })
    this.ref = app.getTodoRef()
    this.ref.on('child_added',function(snapshot,prKey){
      var key = snapshot.key()
      var text = snapshot.val()
      var newItem = {key:key,text:text}
      this.data.todos.push(newItem)
      this.setData({
        todos:this.data.todos
      })
    },this)
    this.ref.on('child_removed',function(snapshot){
      var key = snapshot.key()
      var index = this.data.todos.findIndex(function(item,index){
        if(item.key == key ){
          return true
        }
        return false
      })
      if(index>=0){
        this.data.todos.splice(index,1)
        this.setData({
          todos:this.data.todos
        })
      }
    },this)*/
  }
})
