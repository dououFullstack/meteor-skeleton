Template.wechatLogin.helpers({
  user: function () {
    if (Meteor.userId()) {
      return Meteor.user();
    }
  },
  showLoadingInfos: function(){
    return Session.get('loadingInfos');
  },
  debugInfos: function(){
    return Session.get('debugInfos');
  },
});
