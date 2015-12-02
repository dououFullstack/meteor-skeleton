Template.wechatLogin.helpers({
	getAppId: function() {
		return Meteor.settings.public.appId;
	},
	getCallBackUrl: function() {
		return window.location.hostname;
	}
});