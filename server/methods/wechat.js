Meteor.methods({
  getUserInfo:function(url){
    console.log('2. getUserInfo url = ', url);
    //synchronous GET
    var result = HTTP.call("GET", url);
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log('3. respJson = ', respJson);
      return respJson;
    } else {
      var errorJson = JSON.parse(result.content);
      //throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },
  getOpenIdByCode:function(code){
    // var appId = "wxf691ecaf9243c307";     // 毛豆
    // var appSecret = "731a3266530c51cdb44a81f9c0f23ff0";
    var strPublic = Meteor.settings.public;
    console.log(strPublic);
    // var appId = "wx3175e8b7a6a40895";
    // var appSecret = "061a568248ed8a1b3bcf51a91b94ae03";
    // var appId = "wx82c1c3c2d9b3832c";    // taolizhizhao
    // var appSecret = "6dc186dbe4502f530baa794503c68df5";
    var appId = "wx35fc3ff5c073eb9b";
    var appSecret = "1051d7ee32aa23310c0b6d8e3b12cd05";

    var getOpenIdUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret=" + appSecret + "&code=" + code + "&grant_type=authorization_code";
    var url = getOpenIdUrl;
    console.log('getOpenIdByCode url = ', url);
    this.unblock();
    try {
      var result = HTTP.call("GET", url);
      console.log(result);
      return result;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      console.log("error getOpenId" + e);
      return "error getOpenId: " + e;
    };
  },
  signature: function(url) {
    console.log("urls :", url);
    var accessToken = Meteor.call("accessToken");
    var ticket = Meteor.call("ticket", accessToken);
    return Meteor.call("sign", ticket, url);
  },
  accessToken: function() {
    var future  = Npm.require('fibers/future');
    var fut     = new future();
    var nowtime = parseInt(new Date().getTime() / 1000);

    // 减 300 是为了提前 5 分钟就更新 accessToken，防止过了 expires_in 秒再更新时间隙时间出现问题
    if (expires_in === 0 || (nowtime - timestamp) > expires_in - 300) {
      // 获取新的 accessToken
      HTTP.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
      appId + "&secret=" +
      appSecret, function (error, result) {
        if (!error) {
          var jsonContent = JSON.parse(result.content);
          expires_in  = jsonContent.expires_in;
          accessToken = jsonContent.access_token;
          timestamp   = nowtime;
          fut.return(accessToken);
        }
      });
      console.log("new accessToken :", fut.wait());
    } else {
      console.log("old accessToken :", accessToken + " timeout: " + (nowtime - timestamp));
    }
    // 返回 accessToken
    return accessToken;
  },
  ticket: function(accessToken) {
    var future  = Npm.require('fibers/future');
    var fut     = new future();
    var nowtime = parseInt(new Date().getTime() / 1000);

    // 减 300 是为了提前 5 分钟就更新 ticket，防止过了 expires_in 秒再更新时间隙时间出现问题
    if (sign_expires_in === 0 || (nowtime - sign_timestamp) > sign_expires_in - 300) {
      // 获取新的 ticket
      HTTP.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?" +
      "access_token=" + accessToken + "&type=jsapi", function (error, result) {
        if (!error) {
          var jsonContent = JSON.parse(result.content);
          sign_expires_in  = jsonContent.expires_in;
          ticket = jsonContent.ticket;
          sign_timestamp   = nowtime;
          fut.return(ticket);
        }
      });
      console.log("new ticket :", fut.wait());
    } else {
      console.log("old ticket :", ticket + " timeout: " + (nowtime - sign_timestamp));
    }
    // 返回 ticket
    return ticket;
  },
  sign: function (jsapi_ticket, url) {
    var ret = {
      jsapi_ticket: jsapi_ticket,
      nonceStr: Meteor.call("createNonceStr"),
      timestamp: Meteor.call("createTimestamp"),
      url: url
    };
    var string = Meteor.call("raw", ret);
    ret.signature = CryptoJS.SHA1(string).toString();

    return ret;
  },
  createNonceStr: function () {
    return Math.random().toString(36).substr(2, 15);
  },
  createTimestamp: function () {
    return parseInt(new Date().getTime() / 1000) + '';
  },
  raw: function (args) {
    var keys = Object.keys(args);
    keys = keys.sort();
    var newArgs = {};
    keys.forEach(function (key) {
      newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
  },
});
