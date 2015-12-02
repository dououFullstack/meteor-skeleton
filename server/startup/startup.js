// ***************************************************************
// STARTUP (Will run as soon as the server process is finished starting)
// ***************************************************************

Meteor.startup(function () {
  appId       = "wxe9a58f7343f24cd1";
  appSecret   = "3e28209cef04529cdca5f7d0f7515393";
  accessToken = "";
  ticket      = "";
  signature   = "";
  expires_in  = 0;  // 时间有可能调整，所以需要记录
  timestamp   = 0;
  sign_expires_in  = 0;
  sign_timestamp   = 0;
});