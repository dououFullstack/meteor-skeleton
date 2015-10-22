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
    var appId = "wx3175e8b7a6a40895";
    var appSecret = "061a568248ed8a1b3bcf51a91b94ae03";
    // var appId = "wx82c1c3c2d9b3832c";    // taolizhizhao
    // var appSecret = "6dc186dbe4502f530baa794503c68df5";

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

});
