Router.route('/wechat-config', function () {
  var query = this.params.query;
  var echostr = query.echostr;
  this.response.end(query.echostr);
}, {where: 'server'});

Meteor.loginWithWechat = function(profileObject, callback) {
  var loginRequest = {
    // 用户 openid 作为 username，防止冲突情况出现
    username: profileObject.openid,
    openid: profileObject.openid,
    profile: profileObject,
    loginMethod: "WECHAT",
  };
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

Router.route('userLogin', {
  template: 'wechatLogin',
  path: '/userLogin',
  data: function () {
    console.log("this.params.query :", this.params.query);
    return {
      loginType: this.params.query.logintype
    };
  }
});

Router.route('/wechatLogin', {
  waitOn: function() {
    
  },
  data: function() {
    
  },
  action: function() {
    var code = this.params.query.code;
    var state = this.params.query.state;
    Meteor.call("getOpenIdByCode", code, state, function(e, r) {
      var jsonContent = JSON.parse(r.content);
      var accessToken = jsonContent.access_token;
      var openid = jsonContent.openid;
      var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" +
                accessToken + "&openid=" + openid + "&lang=zh_CN";
      Meteor.call('getUserInfo', url, function(e, r) {
        if(r) {
          Meteor.loginWithWechat(r, function() {
            
            console.log("state :", state);
            Meteor.call("printLog", "state :", state);
            
            if (state == "profile") {
              Router.go('/profile');
            }
            if (state == "activityNew") {
              Router.go('/activities/new');
            }
            if (state === "index" || state === "webLogin") {
              Router.go('/activities');
            }
            if (state.indexOf("/activities") >= 0) {
              Router.go(state);             
            }
            if (state.indexOf("/registration") >= 0) {
              Router.go(state);
            }
          });
        }
      });
    });
  },
  name: 'wechatLogin'
});
