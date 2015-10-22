Router.route('/wechat-config', function () {
  var query = this.params.query;
  var echostr = query.echostr;
  this.response.end(query.echostr);
}, {where: 'server'});


Meteor.loginWithWechat = function(profileObject, callback) {
  //create a login request with openid: true, so our loginHandler can handle this request
  var loginRequest = {
    // city: profileObject.city,
    // country: profileObject.country,
    // headimgurl: profileObject.headimgurl,
    // language: profileObject.language,
    // nickname: profileObject.nickname,
    // username: profileObject.nickname,
    // openid: profileObject.openid,
    // province: profileObject.province,
    // sex: profileObject.sex,
    username: profileObject.nickname,
    openid: profileObject.openid,
    profile: profileObject,
    loginMethod: "WECHAT",
  };
  Session.set("userImage", profileObject.headimgurl);
  Session.set("userNick", profileObject.nickname);
  Session.set("userCity", profileObject.city);
  console.log(profileObject)
  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

Router.route('/wechatLogin', {
  waitOn: function() {
    return ;
  },
  data: function() {
    Session.set('debugInfos', "Here debug info begins: ");
    console.log('rendered begin...');
    Session.set('loadingInfos', "正在连接微信服务器...");

    var code = this.params.query.code;
    Session.set('debugInfos', '1. code is '+ code);
    Session.set('loadingInfos', "连接成功！正在请求用户授权..." + code);

    Meteor.call("getOpenIdByCode", code, function(e, r) {

      Session.set('debugInfos', '2. result is ' + r);
      Session.set('loadingInfos', "用户授权成功！正在获取微信用户OpenID..." + code);

      // if(r.statusCode === 200) {
        // Session.set('loadingInfos', r.content + " result code = " + r.statusCode);

        var jsonContent = JSON.parse(r.content);
        var accessToken = jsonContent.access_token;

        Session.set('loadingInfos', accessToken);

        var openid = jsonContent.openid;
        Session.set('debugInfos', '3. accessToken is '+ accessToken + ', openid is '+ openid);
        Session.set('loadingInfos', "获取微信用户OpenID！正在拉取用户个人信息...");

        var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" +
                  accessToken + "&openid=" + openid + "&lang=zh_CN";
        Meteor.call('getUserInfo', url, function(e, r) {
          if(r) {
            //Session.set('userInfo', r);
            Session.set('debugInfos', '4. user info is ' + r.nickname + r.country);
            Session.set('loadingInfos', "拉取用户个人信息成功！正在使用微信账号登陆系统...");
            Meteor.loginWithWechat(r, function() {
              Session.set('debugInfos', '5. loginWithWechat ok');
              Session.set('loadingInfos', "微信账号登陆系统成功！跳转至个人信息页面...");
              Router.go('/profile');
              //this.render('profile');
              Session.set('loadingInfos', "");
            });
          }
        });
      // } else {
      //   console.log("error received: ", e);
      // }
    });
  },
  name: 'wechatLogin'
});
