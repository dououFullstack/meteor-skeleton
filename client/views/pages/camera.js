Template.camera.rendered = function() {
  // 获取 signature 的方法应该写一个 Meteor.call 交给服务器处理
  // 生成 signature 的方法参考 http://www.yanyulin.info/pages/2015/01/4299249269196.html
  // Meteor.call("getSignature", function() {....})
  wx.config({
    debug: false,
    appId: 'wx35fc3ff5c073eb9b',
    timestamp: 1414587457,
    nonceStr: 'Wm3WZYTPz0wzccnW',
    signature: '59f6aefc7aa3e3af0015c34beb6b9f30f33fca59',
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'chooseImage',
      'uploadImage'
    ]
  });
  wx.ready(function () {});
};

Template.camera.events({
  // 可以不同按钮响应微信提供的其他接口
  'click #camera': function() {
    var nuanxinImages = {
      localId:  [],
      serverId: []
    };
    wx.chooseImage({
      success: function (res) {
        nuanxinImages.localId = res.localIds;
        var html_content = ''
        var i = 0;
        while(i < res.localIds.length)
        {
          html_content = html_content + '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3"><a href="#" class="thumbnail"><img src="' + nuanxinImages.localId[i] + '"></a></div>';
          i++;
        }
        document.getElementById("photo").innerHTML = html_content;
      }
    });
  }
});
